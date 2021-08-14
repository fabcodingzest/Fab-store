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

dotenv.config();

const CloudinaryMediaHooks = path.resolve(
  __dirname,
  'collections/CloudinaryImages/hooks/CloudinaryMediaHooks'
);
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject');

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [CloudinaryMediaHooks]: mockModulePath,
        },
      },
    }),
  },
  collections: [
    Users,
    Product,
    Discount,
    Images,
    CartItem,
    Orders,
    OrderItem,
    Roles,
  ],
  plugins: [addCloudinary],
});
