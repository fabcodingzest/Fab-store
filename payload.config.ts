import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import Users from './collections/Users';
import Product from './collections/Product';
import Discounts from './collections/Discounts';
import Images from './collections/Image';
import addCloudinary from './collections/CloudinaryImages/cloudinaryPlugin';
import CartItems from './collections/CartItems';
import Orders from './collections/Orders';
import OrderItems from './collections/OrderItems';
import Roles from './collections/Roles';

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
    Discounts,
    Images,
    CartItems,
    Orders,
    OrderItems,
    Roles,
  ],
  plugins: [addCloudinary],
});
