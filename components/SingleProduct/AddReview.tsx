import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalHeader,
  Stack,
  Textarea,
  useNumberInput,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormValidationMsg from '../Authentication/FormValidationMsg';

type PropTypes = {
  operation: string;
  productName: string;
  reviewData:
    | {
        review: string;
        rating: number;
        user: { id: string };
      }[]
    | null;
};
type FormValues = {
  review: string;
  rating: number;
};
const AddReview = ({ operation, productName, reviewData }: PropTypes) => {
  const {
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      review: '',
      rating: undefined,
    },
  });
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.5,
      defaultValue: reviewData ? reviewData[0].rating : null,
      min: 0,
      max: 5,
      precision: 1,
      onChange: (valueAsString, valueAsNumber) =>
        setValue('rating', valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });
  useEffect(() => {
    setFocus('review');
    if (reviewData) {
      setValue('review', reviewData[0].review);
    }
  }, [setFocus, reviewData, setValue]);
  const review = watch('review');
  const rating = watch('rating');
  console.log(rating);
  const isSameAsBefore = reviewData
    ? reviewData[0].rating === parseFloat(rating) &&
      reviewData[0].review === review
    : false;
  console.log(isSameAsBefore);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // if operation === edit - Update the product Review
    // Else Add the review
  };
  return (
    <Box>
      <ModalHeader fontSize={{ base: 'md', sm: 'lg', md: '2xl' }} px={0}>
        {operation} {productName} review!
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mb={6}>
          <FormControl id="review">
            <FormLabel htmlFor="review">Review</FormLabel>
            <Textarea
              type="textarea"
              placeholder="Write your review here"
              {...register('review')}
            />
            {errors.review && (
              <FormValidationMsg errorMsg={errors.review.message} />
            )}
          </FormControl>
          <FormControl id="rating">
            <FormLabel htmlFor="rating">Rating (0-5)</FormLabel>
            <HStack maxW="md" {...register('rating')}>
              <Button {...dec}>-</Button>
              <Input {...input} type="number" />
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
            disabled={!isValid || !isDirty || isSubmitting || isSameAsBefore}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit the review
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddReview;
