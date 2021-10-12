import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  useToast,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from '../User';
import FormValidationMsg from './FormValidationMsg';

type FormValues = {
  email: string;
  password: string;
};

export type Props = {
  setModalState?: Dispatch<SetStateAction<string>>;
  onClose?: () => void;
};

const SIGNIN_REQUEST = gql`
  mutation SIGNIN_REQUEST($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        email
        id
      }
    }
  }
`;

const SignIn = ({ setModalState, onClose }: Props) => {
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const [loginUser, { error }] = useMutation(SIGNIN_REQUEST, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const bgHook = useColorModeValue('white', 'gray.700');
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const {
        data: {
          loginUser: { user },
        },
      } = await loginUser({ variables: values });
      if (user) {
        onClose();
      }
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
          {error && <Text color="red">{error.message}</Text>}
        </Stack>
        <Box rounded="lg" bg={bgHook} boxShadow="lg" p={8}>
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
                  <Button
                    variant="ghost"
                    color="blue.400"
                    p={0}
                    fontWeight="light"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => setModalState('forgotpassword')}
                  >
                    Forgot Password?
                  </Button>
                </Stack>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  disabled={!isValid || !isDirty || isSubmitting}
                  isLoading={isSubmitting}
                  loadingText="Signing in"
                >
                  Sign in
                </Button>
                <Box mt={2}>
                  <Button
                    variant="ghost"
                    color="blue.400"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => setModalState('signup')}
                  >
                    Don't have an account yet? Sign Up!
                  </Button>
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
