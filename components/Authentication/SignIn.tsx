import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React from 'react';

import Link from 'next/link';

const SignIn = () => {
  return (
    <Flex minH="60vh" align="center" justify="center" borderRadius="2xl">
      <Stack spacing={8} mx="auto" maxW="lg" py={10} px={6}>
        <Stack align="center">
          <Heading fontSize="3xl" align="center">
            Sign in to your account
          </Heading>
          <Text fontSize="lg" color="gray.600">
            to buy your favourite products ✌️
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
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                {/* <Checkbox>Remember me</Checkbox> Will do this later if I will feel like it. */}
                <Link href="#">
                  <ChakraLink color="blue.400">Forgot password?</ChakraLink>
                </Link>
              </Stack>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
              <Box mt={2}>
                <Link href="#">
                  <ChakraLink color="blue.400">
                    Don't have an account yet? Create one!
                  </ChakraLink>
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
