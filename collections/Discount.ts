import { CollectionConfig } from 'payload/types';
import { isSignedIn, permissions, rules } from '../access';

function validatePercentage(val: unknown): true | string {
  const str = val.toString();
  const regex = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/g;
  const isNumber = regex.test(str);
  if (isNumber) return true;
  return 'The percentage should only be in integer or decimal!';
}

const Discounts: CollectionConfig = {
  slug: 'discounts',
  access: {
    create: permissions.canManageProducts,
    read: rules.canManageProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
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
      validate: validatePercentage,
      required: true,
      max: 100,
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

export default Discounts;
