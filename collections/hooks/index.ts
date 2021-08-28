import { FieldHook } from 'payload/types';
import formatMoney from '../../utilities/formatMoney';

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

const labelBeforeChange: FieldHook = ({ data }) => {
  const label = `${formatMoney(data.total as number)}`;
  console.log(label);

  // doc.admin.useAsTitle = label;
  return label;
};
export { createdBybeforeChangeHook, labelBeforeChange };
