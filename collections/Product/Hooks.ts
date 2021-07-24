import { BeforeChangeHook } from 'payload/dist/collections/config/types';

const beforeChange: BeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create') {
    return req.user.id;
  }
  return data.createdBy;
};

export { beforeChange };
