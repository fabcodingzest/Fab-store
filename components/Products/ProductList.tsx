import { Grid, useMediaQuery } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  // console.log(products);
  const [isSmallerThan375] = useMediaQuery('(max-width: 375px)');

  return (
    <Grid
      templateColumns={
        isSmallerThan375
          ? 'repeat(1, 1fr)'
          : {
              base: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }
      }
      gap={6}
    >
      {products.map((item) => {
        // we send the first variant to make the product card and rest of the variants can be visible once you open single detail page
        return <ProductCard key={item.id} variant={item.variants[0]} />;
      })}
    </Grid>
  );
};

export default ProductList;
