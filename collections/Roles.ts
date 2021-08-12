import { CollectionConfig } from 'payload/types';
import { permissions } from '../access';
import { permissionFields } from '../utilities/permissionFields';

const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    create: ({ req: { user } }): boolean => permissions.canManageRoles(user),
    read: ({ req: { user } }): boolean => permissions.canManageRoles(user),
    update: ({ req: { user } }): boolean => permissions.canManageRoles(user),
    delete: ({ req: { user } }): boolean => permissions.canManageRoles(user),
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
};

export default Roles;
