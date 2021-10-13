import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  ModalHeader,
  Stack,
  Textarea,
  Tooltip,
  useNumberInput,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiFillDelete } from 'react-icons/ai';
import { SINGLE_PRODUCT_QUERY } from './index';
import FormValidationMsg from '../Authentication/FormValidationMsg';
import { useUser } from '../User';

type ReviewGraphQlType = {
  id?: string | string[];
  review: string;
  rating: number;
  user: string;
};

type ReviewType = ReviewGraphQlType & { user: { id: string } };

type PropTypes = {
  operation: string;
  productName: string;

  reviewData: (ReviewType & { users: { id: string } }) | null;
  reviews: ReviewType[] | null;
  productVariantId: string | string[];
  onClose: () => void;
};
type FormValues = {
  review: string;
  rating: number;
};

const UPDATE_REVIEW_MUTATION = gql`
  mutation UPDATE_REVIEW_MUTATION(
    $id: String!
    $reviews: [mutationVariantUpdate_ReviewsInput]
  ) {
    updateVariant(id: $id, data: { reviews: $reviews }) {
      id
      reviews {
        id
        user {
          id
          email
        }
        review
        rating
      }
    }
  }
`;

const AddReview = ({
  operation,
  productName,
  reviewData,
  reviews,
  productVariantId,
  onClose,
}: PropTypes) => {
  const {
    handleSubmit,
    register,
    trigger,
    setFocus,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      review: '',
      rating: 0,
    },
  });
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.5,
      defaultValue: reviewData ? reviewData.rating : null,
      min: 0,
      max: 5,
      precision: 1,
      onChange: async (valueAsString, valueAsNumber) => {
        setValue('rating', valueAsNumber);
        await trigger();
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  useEffect(() => {
    setFocus('review');
    if (reviewData) {
      setValue('review', reviewData.review);
    }
  }, [setFocus, reviewData, setValue]);
  const [updateVariant, { error }] = useMutation(UPDATE_REVIEW_MUTATION, {
    refetchQueries: [
      { query: SINGLE_PRODUCT_QUERY, variables: { id: productVariantId } },
    ],
  });
  const review = watch('review');
  const rating = watch('rating');
  const isSameAsBefore = reviewData
    ? reviewData.rating === rating && reviewData.review === review
    : false;
  console.log(isSameAsBefore);

  const me = useUser();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // if operation === edit - Update the product Review
    let reviewArr: ReviewGraphQlType[];
    if (operation === 'Edit') {
      reviewArr = reviews.map((item): ReviewGraphQlType => {
        if (item.id === reviewData.id) {
          return {
            id: item.id,
            review: values.review,
            rating: values.rating,
            user: me.id,
          };
        }
        return {
          review: item.review,
          rating: item.rating,
          user: item.user.id,
        };
      });
    }
    // Else Add the review
    if (operation === 'Write') {
      reviewArr = reviews.map(
        (item): ReviewGraphQlType => ({
          review: item.review,
          rating: item.rating,
          user: item.user.id,
        })
      );
      reviewArr.unshift({
        review: values.review,
        rating: values.rating,
        user: me.id,
      });
    }
    console.log(reviewArr);

    const { data } = await updateVariant({
      variables: {
        id: productVariantId,
        reviews: reviewArr,
      },
    });
    console.log(data);
    onClose();
  };
  if (error) console.log(error);
  const handleDelete = async (e) => {
    e.preventDefault();
    const filteredArr = reviews
      .map((item) => ({
        id: item.id,
        rating: item.rating,
        review: item.review,
        user: item.user.id,
      }))
      .filter((item) => item.id !== reviewData.id);
    await updateVariant({
      variables: { id: productVariantId, reviews: filteredArr },
    });
    onClose();
  };

  return (
    <Box>
      <ModalHeader fontSize={{ base: 'md', sm: 'lg', md: '2xl' }} px={0}>
        <Flex justifyContent="space-between" align="center" pt={4}>
          {operation} {productName} review!
          {reviewData && (
            <Tooltip
              label="Delete your review"
              bg="gray.800"
              placement="bottom-start"
              color="gray.200"
              fontSize="1rem"
            >
              <Button
                variant="ghost"
                onClick={handleDelete}
                color="red.500"
                _hover={{ bg: 'red.500', color: 'white' }}
              >
                <Icon
                  as={AiFillDelete}
                  h={{ base: 5, sm: 7 }}
                  w={{ base: 5, sm: 7 }}
                  alignSelf="center"
                />
              </Button>
            </Tooltip>
          )}
        </Flex>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mb={6}>
          <FormControl>
            <FormLabel htmlFor="review">Review</FormLabel>
            <Textarea
              id="review"
              placeholder="Write your review here"
              {...register('review', { required: false })}
              p={2}
              fontSize="sm"
            />
            {errors.review && (
              <FormValidationMsg errorMsg={errors.review.message} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="rating">Rating (0-5)</FormLabel>
            <HStack maxW="md">
              <Button {...dec}>-</Button>
              <Input
                id="rating"
                {...input}
                type="number"
                {...register('rating', {
                  valueAsNumber: true,
                  required: 'Rating is required',
                })}
              />
              <Button {...inc}>+</Button>
            </HStack>
            {errors.rating && (
              <FormValidationMsg errorMsg={errors.rating.message} />
            )}
          </FormControl>

          <Button
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
            disabled={isSubmitting || isSameAsBefore}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Submit the review
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddReview;
