import { useQuery, gql } from '@apollo/client';
import {
  Grid,
  Heading,
  Text,
  Box,
  Stack,
  Flex,
  // Image,
  Skeleton,
  SkeletonText,
  Button,
  chakra,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from '../Rating';
import RichText from '../RichText';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: String!) {
    Variant(id: $id) {
      id
      name
      parent {
        id
        name
        description
        status
        variants {
          id
          name
          status
          color
          color_applies
          images {
            image {
              id
              cloudinaryURL
            }
          }
        }
      }
      color_applies
      color
      price
      isBook
      format
      pages
      status
      reviews {
        user {
          firstname
          lastname
        }
        review
        rating
        id
      }
      images {
        image {
          id
          cloudinaryURL
        }
      }
    }
  }
`;

const SingleProduct = ({ id }: { id: string }) => {
  console.log('HELLO P');
  const loadingt = true;
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  if (loading)
    return (
      <Flex
        bg="white"
        rounded="lg"
        height={{ base: 500, sm: 390 }}
        p={4}
        alignItems="start"
        justifyContent="center"
        direction={{ base: 'column', sm: 'row' }}
        maxW="4xl"
        mx="auto"
      >
        <Skeleton
          height={{ base: 300, md: 350 }}
          width="full"
          mx="auto"
          maxW="16rem"
        />
        <Stack
          mx={{ sm: 8 }}
          my={{ base: 4, sm: 0 }}
          spacing={6}
          width="full"
          maxW="24rem"
        >
          <Skeleton height={5} width="full" />
          <Skeleton height={3} width={10} />
          <Skeleton height={2} width={20} />
          <SkeletonText />
        </Stack>
      </Flex>
    );
  const totalRatings =
    data.Variant?.reviews
      .map((item) => {
        return item.rating;
      })
      .reduce((a, b) => a + b, 0) / data.Variant?.reviews.length || 0;
  return (
    <Box bg="white" rounded="lg">
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr 1fr' }}
        py={8}
        gap={4}
        maxW="4xl"
        mx="auto"
        p={{ base: 4, md: 8 }}
      >
        <Box width="full" maxW="18rem" mx="auto" align="center">
          <Image
            layout="responsive"
            width={300}
            height={300}
            objectFit="contain"
            src={data.Variant.images[0].image.cloudinaryURL}
          />
        </Box>
        <Stack spacing={4}>
          <Flex justifyContent="space-between">
            <Heading fontSize={{ base: 'lg', md: '2xl' }}>
              {data.Variant.name}
            </Heading>
            <Tooltip
              label="Add to cart"
              bg="gray.800"
              placement="bottom-start"
              color="gray.200"
              fontSize="1rem"
            >
              <chakra.a href="#" display="flex">
                <Icon
                  as={FiShoppingCart}
                  h={{ base: 4, sm: 6 }}
                  w={{ base: 4, sm: 6 }}
                  alignSelf="center"
                />
              </chakra.a>
            </Tooltip>
          </Flex>
          <Rating
            rating={totalRatings}
            numReviews={data.Variant.reviews.length}
          />
          <Text>$ {data.Variant.price / 100}</Text>
          <Box>
            <Text fontWeight="bold">Description</Text>
            <RichText content={data.Variant.parent.description} />
          </Box>
          {data.Variant.parent.variants.length > 1 && (
            <Box>
              <Text fontWeight="bold" pb={2}>
                Variants
              </Text>
              <Flex>
                {data.Variant.parent.variants.map(
                  (variant) =>
                    variant.color_applies && (
                      <Link key={variant.id} href={`/product/${variant.id}`}>
                        <Box
                          border="1px"
                          borderColor={`${
                            variant.id === id ? 'blue' : 'transparent'
                          }`}
                          shadow={`${variant.id === id ? 'lg' : ''}`}
                          cursor="pointer"
                          p={1}
                          rounded="sm"
                          mr={2}
                        >
                          <Box width={12} height={12}>
                            <Image
                              layout="responsive"
                              width={100}
                              height={100}
                              objectFit="contain"
                              src={variant.images[0].image.cloudinaryURL}
                            />
                          </Box>
                          <Text fontSize="0.6rem">{variant.color}</Text>
                        </Box>
                      </Link>
                    )
                )}
              </Flex>
            </Box>
          )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default SingleProduct;
