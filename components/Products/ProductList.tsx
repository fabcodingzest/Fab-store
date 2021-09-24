import { Flex, Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  // console.log(products);
  return (
    <Flex
      flexWrap="wrap"
      w="full"
      justifyContent="center"
      style={{ gap: '1.4rem' }}
    >
      {products.map((item) => {
        return <ProductCard key={item.id} variant={item.variants[0]} />;
      })}
    </Flex>
  );
};

export default ProductList;
