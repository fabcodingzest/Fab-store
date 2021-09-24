import { useQuery, gql } from '@apollo/client';
import { Box, Container } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
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
  console.log('---------------------------------', page);

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { page, limit: 5 },
  });
  console.log(loading);
  // Filter lists so only products with at least one variant gets rendered in product list
  const products = data?.Products.docs;
  console.log(products);
  if (loading) return <div>loading...</div>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default ProductsPage;
