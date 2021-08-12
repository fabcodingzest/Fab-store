import { BeforeChangeHook } from 'payload/dist/collections/config/types';

const createdBybeforeChangeHook: BeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (data?.createdBy && operation === 'update') {
    return data?.createdBy;
  }
  return req?.user?.id;
};

export { createdBybeforeChangeHook };
