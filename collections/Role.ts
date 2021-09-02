import { CollectionConfig } from 'payload/types';
import { permissions } from '../access';
import { permissionFields } from '../utilities/permissionFields';
import { rolesAfterChange } from './hooks/afterChangeHooks';

const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name of the role',
    },
    ...permissionFields,
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [rolesAfterChange],
  },
};

export default Roles;
