import { Flex, Grid, Box } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  // console.log(products);
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={6}
    >
      {products.map((item) => {
        return <ProductCard key={item.id} variant={item.variants[0]} />;
      })}
    </Grid>
  );
};

export default ProductList;
