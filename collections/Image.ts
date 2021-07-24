import { CollectionConfig } from 'payload/types';

const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: (): boolean => true,
  },
  upload: {
    // thumbnail image for the admin UI will use cloudinary instead of the admin host URL
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adminThumbnail: ({ doc }: Record<string, any>): string =>
      String(doc.cloudinaryURL),
    staticURL: '/images',
    staticDir: 'images',
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

export default Images;
