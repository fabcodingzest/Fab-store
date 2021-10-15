import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import ErrorComponent from '../../../components/ErrorComponent';
import ProductsPage from '../../../components/Products/Products';

const CATEGORY_PRODUCTS_QUERY = gql`
  query CATEGORY_PRODUCTS_QUERY(
    $page: Int!
    $limit: Int!
    $category: Product_category_Input!
  ) {
    Products(
      page: $page
      limit: $limit
      where: { status: { equals: AVAILABLE }, category: { equals: $category } }
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

const Category = () => {
  const { query } = useRouter();
  const page = parseInt(query.page as string);
  const categoryName = (query.name as string).toUpperCase();

  const { data, loading, error } = useQuery(CATEGORY_PRODUCTS_QUERY, {
    variables: { page: page || 1, limit: 5, category: categoryName },
  });
  if (error) return <ErrorComponent error={error} />;
  if (loading) return <div>loading...</div>;
  const products = data?.Products.docs;
  console.log(products);

  return (
    <Box>
      <Text
        textTransform="uppercase"
        fontWeight="bold"
        fontSize={{ base: 'md', md: '2xl' }}
        // px={4}
        // my={3}
      >
        {query.name}
      </Text>
      <ProductsPage products={products} />
    </Box>
  );
};

export default Category;
