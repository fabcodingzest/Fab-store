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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import Select from 'react-select';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import RichText from '../RichText';
import { useUser } from '../User';
import ErrorComponent from '../ErrorComponent';
import Reviews from './Reviews';
import AddReview from './AddReview';
import AuthModal from '../Authentication/Modal';
import SinglePageSkeleton from '../Skeletons/SinglePageSkeleton';
import DiscountText from './DiscountText';

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: String!) {
    Variant(id: $id) {
      id
      name
      parent {
        id
        name
        description
        discount {
          id
          name
          percentage
          description
        }
        status
        category
        variants {
          id
          name
          status
          color
          color_applies
          images {
            id
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
        id
        user {
          id
          firstname
          lastname
        }
        review
        rating
      }
      images {
        id
        image {
          id
          cloudinaryURL
        }
      }
    }
  }
`;
type IdType = { id: string | string[] };
const SingleProduct = ({ id }: IdType) => {
  const [isSmallerThan375] = useMediaQuery('(max-width: 375px)');
  const [selectedSize, setSize] = useState('');
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  useEffect(() => {
    if (data?.Variant?.sizes) setSize(data.Variant.sizes[0]);
  }, [data]);
  const me = useUser();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();
  const { isOpen: filterOpen, onToggle: filterToggle } = useDisclosure();

  if (loading) return <SinglePageSkeleton />;

  if (error) return <ErrorComponent error={error} />;

  const { Variant } = data;
  const haveExistingReview = Variant.reviews.filter((item) => {
    return me && item.user.id === me.id;
  });

  const totalRatings =
    Variant?.reviews
      .map((item: { rating: number }) => {
        return item.rating;
      })
      .reduce((a: number, b: number) => a + b, 0) / Variant?.reviews.length ||
    0;

  const handleAddToCart = () => {
    console.log(`ADD TO CART ${Variant.id}`);
  };

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
            src={Variant.images[i].image.cloudinaryURL}
            alt={Variant.images[i].image.altText}
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
    <Box rounded="lg" pb={14}>
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
            {Variant.images.map((item) => (
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
            <Heading as="h1" fontSize={{ base: 'md', md: 'xl' }}>
              {Variant.name}
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
            initialRating={totalRatings}
            fullSymbol={<AiFillStar />}
            emptySymbol={<AiOutlineStar />}
            readonly
          />
          <DiscountText
            discount={Variant.parent?.discount}
            price={Variant.price}
          />
          {Variant.format && (
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              Format:
              <Text
                as="em"
                fontWeight="bold"
                fontSize={{ base: 'xs', md: 'sm' }}
                color="gray.700"
              >
                {` ${Variant.format}`}
              </Text>
            </Text>
          )}
          <Box>
            <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
              Description
            </Text>
            <RichText fontSize="xs" content={Variant.parent.description} />
          </Box>
          {Variant.parent.variants.length > 1 && (
            <Box>
              <Text
                fontWeight="bold"
                fontSize={{ base: 'xs', md: 'sm' }}
                pb={2}
              >
                Variants
              </Text>
              <Flex>
                {Variant.parent.variants.map((variant) => (
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
          {Variant.parent.category === 'CLOTHES' &&
            Variant?.sizes.length !== 0 && (
              <Box maxW="8rem">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: 'xs', md: 'sm' }}
                  mb={2}
                >
                  Sizes Available
                </Text>
                <Select
                  defaultValue={{
                    label: Variant.sizes[0],
                    value: Variant.sizes[0],
                  }}
                  options={Variant.sizes.map((value: string) => ({
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
      <Box maxW="4xl" p={{ base: 4, md: 8 }} mx="auto">
        <Modal
          size="md"
          isOpen={isReviewOpen}
          onClose={onReviewClose}
          closeOnEsc
          closeOnOverlayClick
        >
          <ModalOverlay />
          <ModalContent bg="gray.50">
            <ModalBody>
              {me ? (
                <AddReview
                  operation={haveExistingReview.length > 0 ? 'Edit' : 'Write'}
                  reviewData={
                    haveExistingReview.length > 0 ? haveExistingReview[0] : null
                  }
                  reviews={Variant.reviews}
                  productName={Variant.name}
                  productVariantId={id}
                  onClose={onReviewClose}
                />
              ) : (
                <ModalHeader align="center">
                  <Text pb={3}>Sign In to write a review</Text>
                  <AuthModal modalState="signin" />
                </ModalHeader>
              )}
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
        <Flex
          maxW="4xl"
          mx="auto"
          justifyContent="space-between"
          align="center"
        >
          <Heading
            textAlign="center"
            fontSize={{ base: 'md', md: 'xl' }}
            as="h3"
          >
            Reviews
          </Heading>
          <Button
            px={3}
            py={4}
            size="xs"
            colorScheme="blue"
            onClick={onReviewOpen}
          >
            <Icon as={BiEdit} mr={1} fontSize="1rem" />
            {haveExistingReview.length > 0 ? 'Edit the' : 'Write a'} review
          </Button>
        </Flex>
        {Variant.reviews.length === 0 ? (
          <Text>No Reviews yet</Text>
        ) : (
          <Reviews reviews={Variant.reviews} />
        )}
      </Box>
    </Box>
  );
};

export default SingleProduct;
