import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import ErrorComponent from '../../components/ErrorComponent';
import Products from '../../components/Products/Products';

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

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page as string);

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { page: page || 1, limit: 5 },
  });
  console.log(loading);
  if (error) return <ErrorComponent error={error} />;

  if (loading) return <div>loading...</div>;
  // Filter lists so only products with at least one variant gets rendered in product list
  const products = data?.Products.docs;
  console.log(products);

  return (
    <>
      <Products products={products} />
    </>
  );
}
