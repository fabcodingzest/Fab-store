import { CollectionConfig } from 'payload/types';
import UserAddress from './UserAddress';
import { CountryOptions } from '../utilities/CountryOptions';

const User: CollectionConfig = {
  slug: 'users',
  auth: true,
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
  ],
};
export default User;
