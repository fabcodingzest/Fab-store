/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload/types';
import { permissions, rules } from '../access';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailSubject: ({ user }) =>
        `Hey ${user.email}, reset your password!`,
      generateEmailHTML: ({ token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/resetpassword?token=${token}`;

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
      name: 'addresses',
      type: 'relationship',
      relationTo: 'addresses',
      hasMany: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'cart',
      type: 'relationship',
      relationTo: 'cart_items',
      hasMany: true,
    },
    {
      name: 'orders',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
    },
    {
      name: 'wishlist',
      type: 'relationship',
      relationTo: 'products',
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
