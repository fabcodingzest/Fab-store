import { useQuery, gql } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import Products from '../../components/Products/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  // const { data, loading, error } = useQuery(TOTAL_PRODUCTS_QUERY);
  const page = parseInt(query.page as string);

  // console.log(data?.Products.totalDocs, 'data');

  // if (loading) return <Box>loading...</Box>;
  // if (error) return <Box>{error.message}</Box>;
  return (
    <>
      <Products page={page || 1} />
    </>
  );
}
