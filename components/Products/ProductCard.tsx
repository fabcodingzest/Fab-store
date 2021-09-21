import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from '../Rating';
import RichText from '../RichText';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 5,
  numReviews: 34,
};

function ProductCard({ variant }) {
  console.log('variant', variant.parent.description);

  return (
    <Flex p={4} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="16rem"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={variant.images[0].image.cloudinaryURL}
          alt={`Picture of ${variant.name}`}
          roundedTop="lg"
        />

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="lg"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              cursor="pointer"
            >
              {variant.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement="top"
              color="gray.800"
              fontSize="1.2em"
            >
              <chakra.a href="#" display="flex">
                <Icon as={FiShoppingCart} h={5} w={5} alignSelf="center" />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
            <Box fontSize="lg" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color="gray.600" fontSize="sm">
                £
              </Box>
              {data.price.toFixed(2)}
            </Box>
          </Flex>
          <Box>
            <RichText content={variant.parent.description.slice(0, 1)} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
