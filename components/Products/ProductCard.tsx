import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Img,
  Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from '../Rating';
import RichText from '../RichText';

function ProductCard({ variant }) {
  console.log('variant', variant);
  const totalRatings =
    variant?.reviews
      .map((item) => {
        return item.rating;
      })
      .reduce((a, b) => a + b, 0) / variant?.reviews.length || 0;
  console.log(totalRatings);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      minW="8rem"
      maxW="14rem"
      height="100%"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      p="0.6rem"
    >
      <Img
        src={variant?.images[0].image.cloudinaryURL}
        alt={`Picture of ${variant?.name}`}
        boxSize={{ base: '8rem', sm: '12rem', md: '14rem' }}
        maxW="100%"
        objectFit="contain"
        mx="auto"
      />

      <Box py={{ base: '2', md: '4' }}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize={{ base: 'xs', md: 'lg' }}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            cursor="pointer"
          >
            {variant?.name}
          </Box>
          <Tooltip
            label="Add to cart"
            bg="white"
            placement="top"
            color="gray.800"
            fontSize={{ base: '0.8rem', md: '1.2rem' }}
          >
            <chakra.a href="#" display="flex">
              <Icon as={FiShoppingCart} h={5} w={5} alignSelf="center" />
            </chakra.a>
          </Tooltip>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Rating rating={totalRatings} numReviews={variant.reviews.length} />
          <Box fontSize="lg" color={useColorModeValue('gray.800', 'white')}>
            <Box as="span" color="gray.600" fontSize="sm">
              £
            </Box>
            748
          </Box>
        </Flex>
        <Box>
          <RichText
            fontSize={{ base: 'xs', sm: 'md', md: 'lg' }}
            content={variant.parent.description.slice(0, 1)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
