import { Box, Text } from '@chakra-ui/react';

const DiscountText = ({ discount, price }) => {
  return (
    <Box>
      $ <Text as={discount ? 'del' : 'em'}>{price / 100}</Text>
      <Text as="em" fontWeight="semibold" color="red.500">
        {' '}
        {(price - (price / 100) * discount?.percentage) / 100}
      </Text>
    </Box>
  );
};

export default DiscountText;
