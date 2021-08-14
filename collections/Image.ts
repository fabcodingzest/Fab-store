/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload/types';
import { isSignedIn, permissions } from '../access';

const Images: CollectionConfig = {
  slug: 'images',
  access: {
    create: isSignedIn,
    read: (): boolean => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  upload: {
    // thumbnail image for the admin UI will use cloudinary instead of the admin host URL
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
