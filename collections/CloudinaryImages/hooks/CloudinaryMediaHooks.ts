import {
  AfterDeleteHook,
  BeforeChangeHook,
} from 'payload/dist/collections/config/types';
import streamifier from 'streamifier';
import { UploadApiResponse, UploadStream } from 'cloudinary';
import { PayloadRequest } from 'payload/dist/express/types';
import { cloudinary } from './cloudinaryConfig';

// Uploading file to cloudinary using streamifier
const streamUpload = (
  file: { data: Buffer },
  id?: string
): Promise<UploadApiResponse> =>
  new Promise<UploadApiResponse>((resolve, reject) => {
    const options = {
      folder: 'fab-store',
      invalidate: true,
      ...(id && { public_id: id, folder: null }), // in case of updating the image, we will need the public_id but not the folder as it's already in the URL
    };
    try {
      const stream: UploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(file.data).pipe(stream);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  });
type Req = PayloadRequest & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any;
};
const beforeChangeHook: BeforeChangeHook = async ({ data, req, operation }) => {
  // DONE: get the file from the req, upload to cloudinary
  const uploadedFile = (req as Req).files.file; // FIXME: PayloadRequest type have file instead of 'files' so that might need a fix
  if (uploadedFile) {
    const result = await streamUpload(
      uploadedFile,
      operation === 'update' ? data.cloudPublicId : null
    );
    data.cloudPublicId = result.public_id;
    data.cloudinaryURL = result.secure_url;
  }
  return data;
};

const afterDeleteHook: AfterDeleteHook = ({ doc }) => {
  // DONE: delete the files from Cloudinary using public_id obtained from cloudinary
  cloudinary.uploader.destroy(doc.cloudPublicId, function (result, error) {
    console.log(result, error);
  });
  return doc;
};

export default { beforeChangeHook, afterDeleteHook };
