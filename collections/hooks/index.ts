import payload from 'payload';
import { CollectionBeforeChangeHook, FieldHook } from 'payload/types';
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
  return label;
};

const orderBeforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req: { user },
  operation,
}) => {
  if (data.createOrderItems) {
    const orderItemsArray = data.createOrderItems;
    const createdOrderItems = await Promise.all(
      orderItemsArray.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (singleOrderItemData: Record<string, any>) => {
          singleOrderItemData.images = singleOrderItemData.images.map(
            (item) => ({
              id: item.id,
              image: item.image.id,
            })
          );
          const createdOrderItem = await payload.create({
            collection: 'order_items',
            data: singleOrderItemData,
          });

          return createdOrderItem.id;
        }
      )
    );
    return {
      ...data,
      order_items: createdOrderItems,
    };
  }
};

export { createdBybeforeChangeHook, labelBeforeChange, orderBeforeChangeHook };
