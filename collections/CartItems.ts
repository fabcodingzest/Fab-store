import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import { validatePositiveNumber } from '../utilities/validatePositiveNumber';

const CartItems: CollectionConfig = {
  slug: 'cart_items',
  access: {
    create: ({ req: { user } }): boolean => isSignedIn(user),
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  fields: [
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      defaultValue: 1,
      validate: validatePositiveNumber,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      validate: (val: unknown): true | string => {
        const str = val.toString();
        const regex = /^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/g;
        const isNonDecimalPositiveInteger = regex.test(str);
        if (isNonDecimalPositiveInteger) return true;
        return 'The total should only be a positive number!';
      },
    },
  ],
};

export default CartItems;
