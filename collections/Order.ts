import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import { validatePositiveNumber } from '../utilities/validatePositiveNumber';
import { orderAfterChangeHook } from './hooks/afterChangeHooks';
import {
  labelBeforeChange,
  orderBeforeChangeHook,
} from './hooks/beforeChangeHooks';

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: (): boolean => false,
    delete: (): boolean => false,
  },
  fields: [
    {
      name: 'total',
      type: 'number',
      defaultValue: 0,
      label: 'Total Amount',
      required: true,
      validate: validatePositiveNumber,
    },
    {
      name: 'label',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (): boolean => false,
      },
      hooks: {
        beforeChange: [labelBeforeChange],
      },
    },
    {
      name: 'payment_method',
      type: 'select',
      // required: true,
      options: [
        { label: 'Cash on delivery', value: 'COD' },
        { label: 'Online Payment through Stripe', value: 'STRIPE' },
      ],
    },
    {
      name: 'payment_id',
      type: 'text',
      required: true,
    },
    {
      name: 'order_items',
      type: 'relationship',
      // required: true,
      relationTo: 'order_items',
      hasMany: true,
    },
    {
      name: 'delivered',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [orderBeforeChangeHook],
    afterChange: [orderAfterChangeHook],
  },
};

export default Orders;
