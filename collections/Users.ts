/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload/types';
import { permissions, rules } from '../access';
import { CountryOptions } from '../utilities/CountryOptions';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailSubject: ({ user }) =>
        `Hey ${user.email}, reset your password!`,
      generateEmailHTML: ({ token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Here is my custom email template!</h1>
              <p>Hello, ${(user as any).email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `;
      },
    },
  },
  access: {
    create: (): boolean => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // Only people with the permission can delete themselves!
    // You cannot delete yourself
    delete: permissions.canManageUsers,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstname',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastname',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'address',
      type: 'array',
      labels: { singular: 'User Address', plural: 'User Addresses' },
      maxRows: 5,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'addressline1',
              label: 'Address Line 1',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'addressline2',
              label: 'Address Line 2',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              label: 'City',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'postalcode',
              label: 'Postal Code',
              type: 'number',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'country',
          type: 'select',
          options: CountryOptions,
        },
      ],
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'cart_items',
      type: 'relationship',
      relationTo: 'cart_items',
      hasMany: true,
    },
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'roles',
    },
  ],
};
export default Users;
