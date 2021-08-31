/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';

const productAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  if (user && operation === 'create') {
    const productsArray = (user.products as []).map((item: any) => item.id);
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        products: [...productsArray, doc.id],
      },
    });
  }
  return doc;
};

const variantAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  if (user && operation === 'create') {
    const productParent = await payload.findByID({
      collection: 'products',
      id: doc.parent,
    });
    const prevVariantsArray = productParent['variants'].map(
      (item: any) => item.id
    );
    await payload.update({
      collection: 'products',
      id: doc.parent,
      data: {
        variants: [...prevVariantsArray, doc.id],
      },
    });
  }
  return doc;
};

const orderAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  if (user && operation === 'create') {
    const ordersArray = (user.products as []).map((item: any) => item.id);
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        orders: [...ordersArray, doc.id],
      },
    });
  }
  return doc;
};

const cartItemAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  try {
    if (user && operation === 'create') {
      const userPrevCart = (user.cart as []).map((item: any) => item.id);
      // Add the cart ids to user.cart
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          cart: [...userPrevCart, doc.id],
        },
      });
      return doc;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export {
  productAfterChangeHook,
  variantAfterChangeHook,
  orderAfterChangeHook,
  cartItemAfterChange,
};
