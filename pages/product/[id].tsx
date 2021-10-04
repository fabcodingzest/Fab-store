import { useRouter } from 'next/router';
import React from 'react';
import SingleProduct from '../../components/SingleProduct';

const ProductDetailPage = ({ query }) => {
  const router = useRouter();
  const { id } = router.query;

  return <SingleProduct id={id} />;
};

export default ProductDetailPage;
