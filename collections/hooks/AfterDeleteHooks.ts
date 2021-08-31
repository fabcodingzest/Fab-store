/* eslint-disable @typescript-eslint/no-explicit-any */
import payload from 'payload';
import { CollectionAfterDeleteHook } from 'payload/types';

const productAfterDeleteHook: CollectionAfterDeleteHook = async ({
  doc,
  req: { user },
}) => {
  if (user) {
    await Promise.all(
      doc.variants.map(async (id: any) => {
        await payload.delete({
          collection: 'product_variants',
          id,
        });
      })
    );
  }
};

export { productAfterDeleteHook };
