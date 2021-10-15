import { Box, Text } from '@chakra-ui/react';
import ProductList from './ProductList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageProp = { products: any };

const ProductsPage = ({ products }: PageProp) => {
  // Filter lists so only products with at least one variant gets rendered in product list

  if (products.length === 0) return <Text px={8}>No products available!</Text>;

  return (
    <Box maxW="6xl" mx="auto">
      <ProductList products={products} />
    </Box>
  );
};

export default ProductsPage;
