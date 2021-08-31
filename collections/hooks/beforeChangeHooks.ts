/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload';
import { CollectionBeforeChangeHook, FieldHook } from 'payload/types';

const createdBybeforeChangeHook: FieldHook = async ({
  data,
  req: { user },
  operation,
}) => {
  try {
    if (data?.createdBy && operation === 'update') {
      return data?.createdBy;
    }
    return user?.id;
  } catch (error) {
    throw new Error(error);
  }
};

const orderBeforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req: { user },
  operation,
}) => {
  try {
    if (user && operation === 'create' && data.createOrderItems) {
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
  } catch (error) {
    throw new Error(error);
  }
};

export { createdBybeforeChangeHook, orderBeforeChangeHook };
