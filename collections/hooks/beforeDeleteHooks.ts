/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import payload from 'payload';
import { CollectionBeforeDeleteHook } from 'payload/types';

const cartItemBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req: { user },
}) => {
  try {
    if (user) {
      const updatedCart = (user.cart as [])
        .filter((item: any) => item.id !== id)
        .map((item: any) => item.id);
      console.log(updatedCart);
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          cart: updatedCart,
        },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const variantBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req: { user },
}) => {
  try {
    if (user) {
      const variantData = await payload.findByID({
        collection: 'product_variants',
        id,
        depth: 5,
      });
      console.log(variantData['parent']['variants']);

      const updatedParentVariants = variantData['parent']['variants']
        .filter((item: any) => item.id !== variantData.id)
        .map((item: any) => item.id);
      console.log(updatedParentVariants);
      await payload.update({
        collection: 'products',
        id: variantData['parent'].id,
        data: {
          variants: updatedParentVariants,
        },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { cartItemBeforeDelete, variantBeforeDelete };
