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
    // if data have createdBy and operation is update then set createdBy to iself.
    if (data?.createdBy && operation === 'update') {
      return data?.createdBy;
    }
    // else set it to user id of the current user who is creating the product
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
    // If the data have createOrderItems (from checkout mutatuion) then we
    if (user && operation === 'create' && data.createOrderItems) {
      const orderItemsArray = data.createOrderItems;
      // Create the order Items with data recieved
      // Promise.all for map because we need to resolve all promises.
      const createdOrderItems = await Promise.all(
        orderItemsArray.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (singleOrderItemData: Record<string, any>) => {
            // changing data for image as needed to create the collection
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
