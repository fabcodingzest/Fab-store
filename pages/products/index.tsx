import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import Products from '../../components/Products/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page as string);

  return (
    <Box>
      <Products page={page || 1} />
    </Box>
  );
}
