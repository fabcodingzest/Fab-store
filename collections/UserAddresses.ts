import { CollectionConfig } from 'payload/types';
import { isSignedIn, rules } from '../access';
import { CountryOptions } from '../utilities/CountryOptions';
import { addressAfterChange } from './hooks/afterChangeHooks';

const userAddresses: CollectionConfig = {
  slug: 'user_addresses',
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageUsers,
    delete: rules.canManageUsers,
  },
  admin: {
    useAsTitle: 'name',
  },
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
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  hooks: {
    afterChange: [addressAfterChange],
  },
};

export default userAddresses;
