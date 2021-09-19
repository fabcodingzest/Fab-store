/* eslint-disable dot-notation */
import addToCartResolver from './addToCartResolver';
import checkoutResolver from './checkout';
import removeFromCartResolver from './removeFromCartResolver';

export const customMutations = (GraphQL, payload) => ({
  addToCart: {
    type: payload.collections['cart_items'].graphQL.type,
    args: {
      productId: {
        type: GraphQL.GraphQLID,
      },
      size: {
        type: GraphQL.GraphQLString,
      },
    },
    resolve: addToCartResolver,
    removeFromCart: {
      type: payload.collections['cart_items'].graphQL.type,
      args: {
        productId: {
          type: GraphQL.GraphQLID,
        },
      },
      resolve: removeFromCartResolver,
    },
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
      shippingAddressId: {
        type: GraphQL.GraphQLID,
      },
    },
    resolve: checkoutResolver,
  },
});
