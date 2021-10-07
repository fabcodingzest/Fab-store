import Slider from 'react-slick';
import { Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import Rating from 'react-rating';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function Reviews({
  reviews,
}: {
  reviews: {
    user: {
      id: string;
      firstname: string;
      lastname: string;
    };
    review: string;
    id: string;
    rating: number;
  }[];
}) {
  const slideValue = useBreakpointValue({ base: 1, sm: 2, lg: 3 });
  const settings = {
    className: 'review-slider',
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideValue,
    slidesToScroll: slideValue,
  };
  console.log('-------------------');
  console.log(reviews.length);

  return (
    <Box>
      <Slider {...settings}>
        {reviews.map((item) => (
          <Box key={item.id}>
            <Box
              rounded="lg"
              shadow="md"
              border="1px"
              borderColor="gray.200"
              p={3}
              m={2}
            >
              <Flex justifyContent="space-between">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                >{`${item.user.firstname} ${item.user.lastname}`}</Text>
                <Rating
                  initialRating={item.rating}
                  fullSymbol={<AiFillStar />}
                  emptySymbol={<AiOutlineStar />}
                  readonly
                />
              </Flex>
              <Text fontSize="xs">{item.review}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Reviews;
