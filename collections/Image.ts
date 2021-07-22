import { CollectionConfig } from 'payload/types';

const Image: CollectionConfig = {
  slug: 'images',
  upload: {
    // thumbnail image for the admin UI will use cloudinary instead of the admin host URL
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adminThumbnail: ({ doc }: Record<string, any>): string =>
      String(doc.cloudinaryURL),
  },
  fields: [
    {
      name: 'altText',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
};

export default Image;
