import { Box } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface RatingProps {
  rating: number;
  numReviews: number;
}

const Rating = ({ rating, numReviews }: RatingProps) => {
  return (
    <Tooltip
      label={`${numReviews} review${numReviews > 1 && 's'}`}
      // bg="white"
      hasArrow
      placement="bottom-end"
      // color="gray.800"
      fontSize="1em"
    >
      <Box d="flex" alignItems="center" fontSize="0.8rem">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
      </Box>
    </Tooltip>
  );
};
export default Rating;
