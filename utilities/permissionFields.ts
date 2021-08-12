import { Field } from 'payload/types';

export const permissionFields: Field[] = [
  {
    name: 'canManageProducts',
    label: 'User can Update and delete any product',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'canSeeOtherUsers',
    label: 'User can query other users',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'canManageUsers',
    label: 'User can Edit other users',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'canManageRoles',
    label: 'User can CRUD roles',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'canManageCart',
    label: 'User can see and manage cart and cart items',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'canManageOrders',
    label: 'User can see and manage orders',
    type: 'checkbox',
    defaultValue: false,
  },
];
