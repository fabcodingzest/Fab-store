import { useQuery, gql } from '@apollo/client';
import { Box, Container } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import ProductList from './ProductList';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    Products {
      docs {
        id
        name
        category
        description
        status
        discount {
          id
          name
          description
          percentage
          active
        }
        variants {
          id
          name
          parent {
            id
            description
          }
          category
          color_applies
          color
          pages
          format
          price
          status
          images {
            image {
              cloudinaryURL
              altText
            }
          }
          reviews {
            user {
              id
              firstname
            }
            review
            rating
          }
        }
      }
    }
  }
`;

export type PageProp = { page: number };

const ProductsPage = ({ page }: PageProp) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(loading);
  // Filter lists so only products with at least one variant gets rendered in product list
  const products = data?.Products.docs.filter(
    (product) => product.variants.length > 0
  );
  console.log(products);
  if (loading) return <div>loading...</div>;

  return (
    <Box maxW="full">
      lol
      <ProductList products={products} />
    </Box>
  );
};

export default ProductsPage;
