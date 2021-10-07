import { Flex, Box, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '../Rating';
import RichText from '../RichText';

function ProductCard({ variant }) {
  const totalRatings =
    variant?.reviews
      .map((item) => {
        return item.rating;
      })
      .reduce((a, b) => a + b, 0) / variant?.reviews.length || 0;
  const [isSmallerThan375] = useMediaQuery('(max-width: 375px)');

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      minW={isSmallerThan375 ? 'full' : '8rem'}
      maxW={isSmallerThan375 ? 'full' : { base: '10rem', sm: '12rem' }}
      height="100%"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      p="0.8rem"
      mx={isSmallerThan375 ? '' : 'auto'}
    >
      <Image
        src={variant?.images[0].image.cloudinaryURL}
        alt={`Picture of ${variant?.name}`}
        width={100}
        height={100}
        layout="responsive"
        objectFit="contain"
      />

      <Box pt={{ base: '2', md: '4' }}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Link href={`/product/${variant.id}`}>
            <Box
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              cursor="pointer"
              maxW="6rem"
            >
              {variant?.name}
            </Box>
          </Link>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Rating rating={totalRatings} numReviews={variant.reviews.length} />
          <Box
            fontSize={{ base: 'xs', sm: 'md' }}
            color={useColorModeValue('gray.800', 'white')}
          >
            <Box as="span" color="gray.600" fontSize="xs">
              £
            </Box>
            748
          </Box>
        </Flex>
        <Box>
          <RichText
            fontSize={{ base: 'xs', sm: 'sm' }}
            content={variant.parent.description.slice(0, 1)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
