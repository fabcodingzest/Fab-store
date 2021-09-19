/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import payload from 'payload';
import { CollectionBeforeDeleteHook } from 'payload/types';

const cartItemBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req: { user },
}) => {
  try {
    // Array without the deleted cart Item
    const updatedCart = (user.cart as [])
      .filter((item: any) => item.id !== id)
      .map((item: any) => item.id);

    // Removing cartItem from user.cart
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        cart: updatedCart,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const variantBeforeDelete: CollectionBeforeDeleteHook = async ({ id }) => {
  try {
    // Get the data of variant to be deleted
    const variantData = await payload.findByID({
      collection: 'variants',
      id,
      depth: 5,
    });

    // Delete the images of the variant from image collection
    const imageIds = variantData['images'].map((img) => img.image.id);

    await Promise.all(
      imageIds.map(async (imageId: string) => {
        await payload.delete({ collection: 'images', id: imageId });
      })
    );

    // Obtain array of ids without the id of item to be deleted
    const updatedParentVariants = variantData['parent']['variants']
      .filter((item: any) => item.id !== variantData.id)
      .map((item: any) => item.id);

    // remove the item to be deleted from parent product
    await payload.update({
      collection: 'products',
      id: variantData['parent'].id,
      data: {
        variants: updatedParentVariants,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { cartItemBeforeDelete, variantBeforeDelete };
