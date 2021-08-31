/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload';
import { CollectionAfterDeleteHook } from 'payload/types';

const productAfterDeleteHook: CollectionAfterDeleteHook = async ({
  doc,
  req: { user },
}) => {
  try {
    if (user) {
      // Delete all the variants after the parent product has been deleted
      await Promise.all(
        doc.variants.map(async (id: any) => {
          await payload.delete({
            collection: 'product_variants',
            id,
          });
        })
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { productAfterDeleteHook };
