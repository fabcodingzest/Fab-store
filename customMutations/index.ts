/* eslint-disable dot-notation */
import { addToCartResolver } from './addToCartResolver';
import checkoutResolver from './checkout';

export const customMutations = (GraphQL, payload) => ({
  addToCart: {
    type: payload.collections['cart_items'].graphQL.type,
    args: {
      productId: {
        type: new GraphQL.GraphQLScalarType(GraphQL.GraphQLID),
      },
    },
    resolve: addToCartResolver,
  },
  checkout: {
    type: payload.collections['orders'].graphQL.type,
    args: {
      token: {
        type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString),
      },
      paymentMethod: {
        type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString),
      },
    },
    resolve: checkoutResolver,
  },
});
