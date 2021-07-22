import { CollectionConfig } from 'payload/types';

const Discount: CollectionConfig = {
  slug: 'discounts',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Discount Name',
      required: true,
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description of the Discount',
      type: 'textarea',
      required: true,
    },
    {
      name: 'percentage',
      type: 'number',
      required: true,
      admin: {
        placeholder: 'Discount Percentage in numbers',
        step: 0.5,
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Is the Discount Active?',
      required: true,
    },
  ],
};

export default Discount;
