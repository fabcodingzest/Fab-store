import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [],
});
