import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import vairantFields from '../utilities/ProductVariant';
import { variantAfterChangeHook } from './hooks/afterChangeHooks';
import { variantBeforeDelete } from './hooks/beforeDeleteHooks';

export const ProductVariants: CollectionConfig = {
  slug: 'variants',
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
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
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    ...vairantFields,
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
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
