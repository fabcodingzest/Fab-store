/* eslint-disable dot-notation */
import payload from 'payload';

export const addToCartResolver = async (
  root,
  { productId },
  { req: { user } }
) => {
  const loggedInUserId = user.id;

  // 1. Query the current user and see if they are logged in.
  if (!user) {
    throw new Error('You must be logged in to do this!');
  }

  // 2. Query the current user's cart
  const allCartItems = await payload.find({
    collection: 'cart_items',
    depth: 5,
    where: {
      user: { equals: loggedInUserId },
      products: { equals: productId },
    },
  });

  // 3. See if the current item is already in their cart
  console.log(allCartItems.docs);

  return { quantity: 3 };
};
