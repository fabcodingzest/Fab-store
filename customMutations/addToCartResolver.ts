/* eslint-disable dot-notation */
import payload from 'payload';

export const addToCartResolver = async (
  root,
  { productId, wishlist },
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
      product: { equals: productId },
    },
  });

  // 3. See if the current item is already in their cart
  const [existingCartItems] = allCartItems.docs;

  console.log(allCartItems);

  // 4. If it exists already, increment by 1
  if (existingCartItems) {
    console.log(
      `There are already ${existingCartItems.quantity}, increment by 1!`
    );
    const returnedDocAfterUpdate = await payload.update({
      collection: 'cart_items',
      id: existingCartItems.id,
      data: {
        quantity: existingCartItems.quantity + 1,
      },
    });

    return returnedDocAfterUpdate;
  }

  // 4.2 If it doesn't exist, then create a new CartItem
  const createdCartItem = await payload.create({
    collection: 'cart_items',
    data: {
      product: productId,
      user: user.id,
      wishlist,
    },
  });
  return createdCartItem;
};
