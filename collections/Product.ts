import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import { productAfterChangeHook } from './hooks/afterChangeHooks';
import { productAfterDeleteHook } from './hooks/afterDeleteHooks';
import { createdBybeforeChangeHook } from './hooks/beforeChangeHooks';

const Product: CollectionConfig = {
  slug: 'products',
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
      label: 'Product Name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description of the Product',
      required: true,
      admin: {
        placeholder: 'Description of the Product...',
        elements: ['h2', 'h3', 'ol', 'ul', 'link'],
        leaves: ['bold', 'italic', 'underline', 'strikethrough'],
      },
    },
    {
      name: 'variants',
      type: 'relationship',
      relationTo: 'product_variants',
      hasMany: true,
    },
    {
      name: 'discount',
      type: 'relationship',
      relationTo: 'discounts',
      label: 'Discount Available',
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [createdBybeforeChangeHook],
      },
    },
  ],
  hooks: {
    afterChange: [productAfterChangeHook],
    afterDelete: [productAfterDeleteHook],
  },
};

export default Product;
