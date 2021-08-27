import payload from 'payload';

export const checkoutResolver = (_, { productId }) => {
  console.log(productId);
  console.log(payload.collections);
};
