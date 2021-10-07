import { CollectionConfig } from 'payload/types';
import { isSignedIn, permissions, rules } from '../access';
import vairantFields, { reviewUpdateAccess } from '../utilities/ProductVariant';
import { variantAfterChangeHook } from './hooks/afterChangeHooks';
import { variantBeforeDelete } from './hooks/beforeDeleteHooks';

export const ProductVariants: CollectionConfig = {
  slug: 'variants',
  access: {
    create: permissions.canManageProducts,
    read: rules.canReadProducts,
    update: isSignedIn,
    delete: rules.canManageProducts,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      access: reviewUpdateAccess,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      access: reviewUpdateAccess,
    },
    ...vairantFields,
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: reviewUpdateAccess,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [variantAfterChangeHook],
    beforeDelete: [variantBeforeDelete],
  },
};
