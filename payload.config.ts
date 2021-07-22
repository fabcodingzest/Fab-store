import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import Users from './collections/User';
import Product from './collections/Product/Product';
import Discount from './collections/Discount';
import ProductVariant from './collections/ProductVariant';
import Image from './collections/Image';
import addCloudinary from './collections/CloudinaryImages/cloudinaryPlugin';

dotenv.config();

const CloudinaryMediaHooks = path.resolve(
  __dirname,
  './collections/CloudinaryImages/hooks/CloudinaryMediaHooks'
);
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject');

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  graphQL: {
    disablePlaygroundInProduction: false,
  },
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
  collections: [Users, Product, Discount, ProductVariant, Image],
  plugins: [addCloudinary],
});
