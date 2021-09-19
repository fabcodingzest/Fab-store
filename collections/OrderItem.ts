import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import vairantFields from '../utilities/ProductVariant';

const OrderItems: CollectionConfig = {
  slug: 'order_items',
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: (): boolean => false,
    delete: (): boolean => false,
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
    ...vairantFields,
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
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
    },
    {
      name: 'product_ref',
      type: 'relationship',
      relationTo: 'variants',
    },
  ],
};

export default OrderItems;
