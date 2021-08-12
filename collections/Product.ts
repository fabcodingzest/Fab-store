import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import vairantFields from '../utilities/ProductVariant';
import { createdBybeforeChangeHook } from './hooks/beforeChange';

const Product: CollectionConfig = {
  slug: 'products',
  access: {
    create:  ({ req: { user } }): boolean => isSignedIn(user),
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
      name: 'category',
      label: 'Product Category',
      type: 'select',
      options: [
        { label: 'Clothes', value: 'CLOTHES' },
        { label: 'Stationary', value: 'STATIONARY' },
        { label: 'Toys', value: 'TOYS' },
        { label: 'Furniture', value: 'FURNITURE' },
        { label: 'Books', value: 'BOOKS' },
        { label: 'Jwellery', value: 'JWELLERY' },
        { label: 'Electronics', value: 'ELECTRONICS' },
      ],
      required: true,
      index: true,
    },
    {
      name: 'variants',
      type: 'array',
      fields: vairantFields,
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
};

export default Product;
