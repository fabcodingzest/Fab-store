/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload/types';
import { isSignedIn, permissions } from '../access';

const Images: CollectionConfig = {
  slug: 'images',
  access: {
    create: ({ req: { user } }): boolean => isSignedIn(user),
    read: (): boolean => true,
    update: ({ req: { user } }): boolean => permissions.canManageProducts(user),
    delete: ({ req: { user } }): boolean => permissions.canManageProducts(user),
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
