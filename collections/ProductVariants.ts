import { CollectionConfig } from 'payload/types';
import vairantFields from '../utilities/ProductVariant';

export const ProductVariants: CollectionConfig = {
  slug: 'product_variants',
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
    },
    ...vairantFields,
  ],
};
