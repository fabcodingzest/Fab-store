import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import Users from './collections/Users';
import Product from './collections/Product';
import Discount from './collections/Discount';
import Images from './collections/Image';
import addCloudinary from './collections/CloudinaryImages/cloudinaryPlugin';
import CartItem from './collections/CartItem';
import Orders from './collections/Order';
import OrderItem from './collections/OrderItem';
import Roles from './collections/Role';
import { customMutations } from './customMutations';
import { ProductVariants } from './collections/ProductVariants';
import userAddresses from './collections/UserAddresses';
import { prodEndpoint } from './config';

dotenv.config();

const CloudinaryMediaHooks = path.resolve(
  __dirname,
  'collections/CloudinaryImages/hooks/CloudinaryMediaHooks'
);
const CheckoutStripeMutation = path.resolve(
  __dirname,
  'customMutations/checkout'
);
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject');

export default buildConfig({
  serverURL:
    process.env.NODE_ENV === 'production'
      ? 'https://fab-cart.herokuapp.com'
      : 'http://localhost:3000',
  cors: [
    'https://fab-cart.herokuapp.com',
    'https://fab-cart.herokuapp.com/api/graphql',
  ],
  admin: {
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [CloudinaryMediaHooks]: mockModulePath,
          [CheckoutStripeMutation]: mockModulePath,
        },
      },
    }),
  },
  graphQL: {
    mutations: customMutations,
    disablePlaygroundInProduction: false,
  },
  collections: [
    Users,
    userAddresses,
    Product,
    ProductVariants,
    Discount,
    Images,
    CartItem,
    Orders,
    OrderItem,
    Roles,
  ],
  plugins: [addCloudinary],
});
