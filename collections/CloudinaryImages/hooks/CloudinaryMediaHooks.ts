/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterChangeHook,
  AfterDeleteHook,
  BeforeChangeHook,
} from 'payload/dist/collections/config/types';
import streamifier from 'streamifier';
import { UploadApiResponse, UploadStream } from 'cloudinary';
import path from 'path';
import fs, { promises as Fs } from 'fs';
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

async function exists(filePath: string) {
  try {
    await Fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function deleteFile(filePath: string) {
  const fileExists = await exists(filePath);
  if (fileExists)
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    });
}

const afterChangeHook: AfterChangeHook = ({ doc }) => {
  // DONE: find the doc by the doc.filename on the hard drive of the server
  // if it exists, delete it
  if (doc?.filename) {
    const mainFilePath = path.resolve(
      `${__dirname}../../../../images/${doc.filename}`
    );
    deleteFile(mainFilePath);
  }
  // DONE: and all of its sizes(if any)
  if (doc?.sizes) {
    // eslint-disable-next-line no-restricted-syntax
    for (const imageName in doc.sizes) {
      if (imageName) {
        console.log(path.resolve(`${__dirname}`));
        const filePath = path.resolve(
          `${__dirname}../../../../images/${doc.sizes[imageName].filename}`
        );
        deleteFile(filePath);
      }
    }
  }
  // I tried deleting the empty directory as well but it was creating some errors while update operation so I left it.

  return doc;
};

const afterDeleteHook: AfterDeleteHook = ({ doc }) => {
  // DONE: delete the files from Cloudinary using public_id obtained from cloudinary
  cloudinary.uploader.destroy(doc.cloudPublicId, function (result, error) {
    console.log(result, error);
  });
  return doc;
};

export default { beforeChangeHook, afterChangeHook, afterDeleteHook };
