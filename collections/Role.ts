import { CollectionConfig } from 'payload/types';
import { permissions } from '../access';
import { permissionFields } from '../utilities/permissionFields';

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
      unique: true,
    },
    ...permissionFields,
  ],
};

export default Roles;
