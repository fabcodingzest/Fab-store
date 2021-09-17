import { Box, Flex } from '@chakra-ui/layout';
import ForgotPassword from '../components/Authentication/ForgotPassword';

const forgotpassword = () => {
  return (
    <Flex align="center" justifyContent="center" minH="80vh">
      <ForgotPassword />
    </Flex>
  );
};

export default forgotpassword;
