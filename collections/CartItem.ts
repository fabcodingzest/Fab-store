import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import { validatePositiveNumber } from '../utilities/validatePositiveNumber';
import { cartItemAfterChange } from './hooks/afterChangeHooks';
import { cartItemBeforeDelete } from './hooks/beforeDeleteHooks';

const CartItems: CollectionConfig = {
  slug: 'cart_items',
  admin: {
    useAsTitle: 'product',
  },
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product_variants',
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 1,
      validate: validatePositiveNumber,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
  hooks: {
    afterChange: [cartItemAfterChange],
    beforeDelete: [cartItemBeforeDelete],
  },
};

export default CartItems;
