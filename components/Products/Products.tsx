import { useQuery, gql } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import ErrorComponent from '../ErrorComponent';
import ProductList from './ProductList';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($page: Int!, $limit: Int!) {
    Products(
      page: $page
      limit: $limit
      where: { status: { equals: AVAILABLE } }
    ) {
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
          color_applies
          color
          pages
          sizes
          format
          price
          status
          images {
            id
            image {
              id
              cloudinaryURL
              altText
            }
          }
          reviews {
            id
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
  console.log('---------------------------------', page);

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { page, limit: 5 },
  });
  console.log(loading);
  if (error) return <ErrorComponent error={error} />;

  // Filter lists so only products with at least one variant gets rendered in product list
  const products = data?.Products.docs;
  console.log(products);
  if (loading) return <div>loading...</div>;

  return (
    <Box maxW="6xl" mx="auto">
      <ProductList products={products} />
    </Box>
  );
};

export default ProductsPage;
