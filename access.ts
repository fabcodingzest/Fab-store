/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const permissionsList = [
  'canManageProducts',
  'canSeeOtherUsers',
  'canManageUsers',
  'canManageRoles',
  'canManageCart',
  'canManageOrders',
];

export function isSignedIn({ req: { user } }): boolean {
  return !!user;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ req: { user } }) {
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
  canManageProducts: (data): boolean | Record<string, unknown> => {
    const {
      req: { user },
      id,
    } = data;

    // First make array of all products owned by user
    const ownedProductIds = user.products
      .map((item: any) => item.id)
      .filter((item: any) => item.id === id);

    // if array is empty that means its not owned by user so cant't do anything otherwise return true.
    const doesUserOwnProduct = ownedProductIds.length > 0;

    if (!isSignedIn(data)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts(data)) {
      return true;
    }
    // 2. If not, do they own this item?
    return doesUserOwnProduct || { createdBy: { equals: user.id } };
  },
  canOrder: (data): boolean | Record<string, unknown> => {
    const {
      req: { user },
    } = data;
    if (!isSignedIn(data)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart(data)) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { equals: user.id } };
  },
  canManageOrderItems: (data): boolean | Record<string, unknown> => {
    const {
      req: { user },
      id,
    } = data;

    // First make array of all order Items owned by user
    const ownedOrderItemIds = user.orders
      .map((item: any) => item.orderItem.id)
      .filter((item: any) => item.orderItem.id === id);

    // if array is empty that means its not owned by user so cant't do anything otherwise return true.
    const isThisUserOrderItem = ownedOrderItemIds.length > 0;

    if (!isSignedIn(data)) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart(data)) {
      return true;
    }
    // 2. If not, do they own this item?
    return isThisUserOrderItem;
  },
  canReadProducts: (data): boolean | Record<string, unknown> => {
    if (!isSignedIn(data)) {
      return false;
    }
    if (permissions.canManageProducts(data)) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: { equals: 'AVAILABLE' } };
  },
  canManageUsers: (data): boolean | Record<string, unknown> => {
    const {
      req: { user },
    } = data;
    if (!isSignedIn(data)) {
      return false;
    }
    if (permissions.canManageUsers(data)) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: { equals: user.id } };
  },
};
