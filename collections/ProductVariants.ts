import { CollectionConfig } from 'payload/types';
import vairantFields from '../utilities/ProductVariant';

export const ProductVariants: CollectionConfig = {
  slug: 'product_variants',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
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
      name: 'name',
      type: 'text',
      required: true,
    },
    ...vairantFields,
  ],
};
