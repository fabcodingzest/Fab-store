/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const permissionsList = [
  'canManageProducts',
  'canSeeOtherUsers',
  'canManageUsers',
  'canManageRoles',
  'canManageCart',
  'canManageOrders',
];

export function isSignedIn(user): boolean {
  return !!user;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function (user) {
      return !!user?.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts: ({ req: { user } }): boolean | Record<string, unknown> => {
    if (!isSignedIn(user)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts(user)) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: user.id } };
  },
  canOrder: ({ req: { user } }): boolean | Record<string, unknown> => {
    if (!isSignedIn(user)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart(user)) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: user.id } };
  },
  canManageOrderItems: ({
    req: { user },
  }): boolean | Record<string, unknown> => {
    if (!isSignedIn(user)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart(user)) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { equals: user.id } } };
  },
  canReadProducts: ({ req: { user } }): boolean | Record<string, unknown> => {
    if (!isSignedIn(user)) {
      return false;
    }
    if (permissions.canManageProducts(user)) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { variants: [{ status: { equals: 'AVAILABLE' } }] };
  },
  canManageUsers: ({ req: { user } }): boolean | Record<string, unknown> => {
    if (!isSignedIn(user)) {
      return false;
    }
    if (permissions.canManageUsers(user)) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: { equals: user.id } };
  },
};
