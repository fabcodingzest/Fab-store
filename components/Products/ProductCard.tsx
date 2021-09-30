import { Flex, Box, useColorModeValue, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Rating from '../Rating';
import RichText from '../RichText';

function ProductCard({ variant }) {
  const totalRatings =
    variant?.reviews
      .map((item) => {
        return item.rating;
      })
      .reduce((a, b) => a + b, 0) / variant?.reviews.length || 0;

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      minW="8rem"
      maxW={{ base: '10rem', sm: '12rem' }}
      height="100%"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      p="0.8rem"
      mx="auto"
    >
      <Image
        src={variant?.images[0].image.cloudinaryURL}
        alt={`Picture of ${variant?.name}`}
        width={300}
        height={300}
        layout="responsive"
        objectFit="contain"
      />

      <Box pt={{ base: '2', md: '4' }}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            cursor="pointer"
          >
            {variant?.name}
          </Box>
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
