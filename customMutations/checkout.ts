/* eslint-disable dot-notation */
import payload from 'payload';
import { v4 as uuidv4 } from 'uuid';
import stripeConfig from '../utilities/stripe';

const checkoutResolver = async (
  root,
  { token, paymentMethod },
  { req: { user } }
) => {
  // 1. Query the current user and see if they are logged in.
  if (!user) {
    throw new Error('You must be logged in to create an order!');
  }

  const userWithDetails = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 3,
  });

  // 2. Calc the total price for their order.
  const cartItems = userWithDetails['cart'].filter(
    (cartItem) => cartItem.product
  );
  const CartItemInputType =
    payload.collections['cart_items'].graphQL.mutationInputType;
  const amount = cartItems.reduce(
    (tally: number, cartItem: typeof CartItemInputType) =>
      tally + cartItem.quantity * cartItem.product.price,
    0
  );
  let charge;
  if (paymentMethod === 'STRIPE') {
    charge = await stripeConfig.paymentIntents
      .create({
        amount,
        currency: 'INR',
        confirm: true,
        payment_method: token,
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  } else {
    charge = {
      amount,
      id: uuidv4(),
    };
  }

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      category: cartItem.product.category,
      color_applies: cartItem.product.color_applies,
      description: cartItem.product.parent.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      images: cartItem.product.images,
    };
    return orderItem;
  });

  const order = await payload.create({
    collection: 'orders',
    data: {
      total: charge.amount,
      payment_id: charge.id,
      createOrderItems: orderItems,
      user: user.id,
    },
  });

  // 3. Clean up old cartItems
  const cartItemIds = userWithDetails['cart'].map((cartItem) => cartItem.id);
  console.log(cartItemIds);

  console.log('Gonna delete the cart Items now');
  await Promise.all(
    cartItemIds.map(async (cartItemId) => {
      const deletedItem = await payload.delete({
        collection: 'cart_items',
        id: cartItemId,
      });
      return deletedItem;
    })
  );

  return order;
};

export default checkoutResolver;
