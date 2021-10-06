import { useQuery, gql } from '@apollo/client';
import {
  Grid,
  Heading,
  Text,
  Box,
  Stack,
  Flex,
  Skeleton,
  SkeletonText,
  Tooltip,
  Icon,
  useMediaQuery,
  Button,
} from '@chakra-ui/react';
import Select from 'react-select';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from '../Rating';
import RichText from '../RichText';
import { sizeArray } from '../../utilities/ProductVariant';
import { useUser } from '../User';
import ErrorComponent from '../ErrorComponent';

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
        category
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
      sizes
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

const SingleProduct = ({ id }: { id: string | string[] }) => {
  console.log('HELLO P');
  const [isSmallerThan375] = useMediaQuery('(max-width: 375px)');
  const [selectedSize, setSize] = useState('');
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const me = useUser();
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

  if (error) return <ErrorComponent error={error} />;
  const totalRatings =
    data.Variant?.reviews
      .map((item) => {
        return item.rating;
      })
      .reduce((a, b) => a + b, 0) / data.Variant?.reviews.length || 0;

  const handleAddToCart = () => {
    console.log(`ADD TO CART ${data.Variant.id}`);
  };
  console.log(data.Variant);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    dotsClass: 'slick-dots custom-thumbnail',
    customPaging(i: number) {
      return (
        <Box rounded="md" p="0.5" w={10} h={10}>
          <Image
            src={data.Variant.images[i].image.cloudinaryURL}
            alt={data.Variant.images[i].image.altText}
            width={100}
            height={100}
            layout="responsive"
            objectFit="contain"
          />
        </Box>
      );
    },
  };
  return (
    <Box rounded="lg">
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr 1fr' }}
        py={8}
        gap={4}
        maxW="4xl"
        mx="auto"
        p={{ base: 4, md: 8 }}
      >
        <Box
          width="full"
          maxW={isSmallerThan375 ? '9rem' : { base: '12rem', md: '14rem' }}
          mx="auto"
          align="center"
        >
          <Slider {...settings}>
            {data.Variant.images.map((item) => (
              <Box key={item.image.id}>
                <Image
                  layout="responsive"
                  width={300}
                  height={300}
                  objectFit="contain"
                  src={item.image.cloudinaryURL}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Stack spacing={2.5} mt={{ base: '1rem', sm: '0' }}>
          <Flex justifyContent="space-between">
            <Heading fontSize={{ base: 'md', md: 'xl' }}>
              {data.Variant.name}
            </Heading>
            <Tooltip
              label="Add to cart"
              bg="gray.800"
              placement="bottom-start"
              color="gray.200"
              fontSize="1rem"
            >
              <Button variant="ghost" onClick={handleAddToCart}>
                <Icon
                  as={FiShoppingCart}
                  h={{ base: 4, sm: 6 }}
                  w={{ base: 4, sm: 6 }}
                  alignSelf="center"
                />
              </Button>
            </Tooltip>
          </Flex>
          <Rating
            rating={totalRatings}
            numReviews={data.Variant.reviews.length}
          />
          <Text>$ {data.Variant.price / 100}</Text>
          {data.Variant.format && (
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              Format:
              <Text
                as="em"
                fontWeight="bold"
                fontSize={{ base: 'xs', md: 'sm' }}
                color="gray.700"
              >
                {` ${data.Variant.format}`}
              </Text>
            </Text>
          )}
          <Box>
            <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
              Description
            </Text>
            <RichText fontSize="xs" content={data.Variant.parent.description} />
          </Box>
          {data.Variant.parent.variants.length > 1 && (
            <Box>
              <Text
                fontWeight="bold"
                fontSize={{ base: 'xs', md: 'sm' }}
                pb={2}
              >
                Variants
              </Text>
              <Flex>
                {data.Variant.parent.variants.map((variant) => (
                  <Link key={variant.id} href={`/product/${variant.id}`}>
                    <Box
                      border="1px"
                      borderColor={`${
                        variant.id === id ? 'gray.200' : 'transparent'
                      }`}
                      shadow={`${variant.id === id ? 'lg' : ''}`}
                      cursor="pointer"
                      p={1}
                      rounded="md"
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
                ))}
              </Flex>
            </Box>
          )}
          {data.Variant.parent.category === 'CLOTHES' &&
            data.Variant.sizes.length !== 0 && (
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: 'xs', md: 'sm' }}
                  mb={2}
                >
                  Sizes
                </Text>
                <Select
                  options={data.Variant.sizes.map((value: string) => ({
                    label: value,
                    value,
                  }))}
                  onChange={(option: { label: string; value: string }) =>
                    setSize(option.value)
                  }
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: 'var(--chakra-colors-gray-100)',
                      primary: 'var(--chakra-colors-gray-700)',
                      primary50: 'var(--chakra-colors-gray-200)',
                    },
                  })}
                />
              </Box>
            )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default SingleProduct;
