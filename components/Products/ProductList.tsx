import { Flex } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  console.log(products);
  return (
    <Flex flexWrap="wrap" w="full" justifyContent="center">
      {products.map((item) => {
        return <ProductCard key={item.id} variant={item.variants[0]} />;
      })}
    </Flex>
  );
};

export default ProductList;
