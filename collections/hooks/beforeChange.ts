import { FieldHook } from 'payload/types';

const createdBybeforeChangeHook: FieldHook = async ({
  data,
  req: { user },
  operation,
}) => {
  if (data?.createdBy && operation === 'update') {
    return data?.createdBy;
  }
  return user?.id;
};

export { createdBybeforeChangeHook };
