import { BeforeChangeHook } from 'payload/dist/collections/config/types';

const beforeChange: BeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create') {
    return req?.user?.id;
  }
  if (operation === 'update') {
    return data?.createdBy;
  }
};

export { beforeChange };
