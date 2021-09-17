import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  FormLabel,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword = (): JSX.Element => {
  return (
    <Flex minH="60vh" align="center" justify="center" borderRadius="2xl">
      <Stack spacing={8} mx="auto" maxW="lg" py={10} px={6}>
        <Stack align="center">
          <Heading fontSize="3xl" align="center">
            Forgot your password?
          </Heading>
          <Text fontSize="lg" color="gray.600">
            You'll get an email with a reset link
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="your-email@example.com" />
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
