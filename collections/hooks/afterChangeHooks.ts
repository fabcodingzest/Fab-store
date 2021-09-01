/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';

const productAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  try {
    // Check if user is logged in and operation is create
    if (user && operation === 'create') {
      // Create array of product ids from user.products data
      const oldProductArray = (user.products as []).map((item: any) => item.id);
      // Updating the users collection by adding the created product to user.products
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          products: [...oldProductArray, doc.id],
        },
      });
    }
    return doc;
  } catch (error) {
    throw new Error(error);
  }
};

const variantAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req: { user },
  operation,
}) => {
  try {
    if (user && operation === 'create') {
      // Getting Parent data so we can have previous Variants Array
      const productParent = await payload.findByID({
        collection: 'products',
        id: doc.parent,
      });

      // As the variant have all data we map it to just have id
      const prevVariantsArray = productParent['variants'].map(
        (item: any) => item.id
      );

      // Update the product by adding the createdVariant to parent product
      await payload.update({
        collection: 'products',
        id: doc.parent,
        data: {
          variants: [...prevVariantsArray, doc.id],
        },
      });
    }
    return doc;
  } catch (error) {
    throw new Error(error);
  }
};

const orderAfterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
  try {
    // Mapping user.products to have array of ids only
    const userData = await payload.findByID({
      collection: 'users',
      id: doc.user,
    });

    const prevOrdersArray = (userData['products'] as []).map(
      (item: any) => item.id
    );

    // Add current order id to user.orders array
    await payload.update({
      collection: 'users',
      id: userData.id,
      data: {
        orders: [...prevOrdersArray, doc.id],
      },
    });
    return doc;
  } catch (error) {
    throw new Error(error);
  }
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