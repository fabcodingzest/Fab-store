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
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import FormValidationMsg from './FormValidationMsg';

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    alert(JSON.stringify(values, null, 2));
    // return new Promise((resolve) => {
    //   // setTimeout(() => {
    //     // resolve();
    //   // }, 3000);
    // });
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
                {errors.email && (
                  <FormValidationMsg errorMsg={errors.email.message} />
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <FormValidationMsg errorMsg={errors.password.message} />
                )}
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
                  type="submit"
                  disabled={!isValid || !isDirty}
                  isLoading={isSubmitting}
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
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
