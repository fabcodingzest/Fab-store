import { useMutation, gql } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  FormLabel,
  Checkbox,
  Heading,
  Input,
  HStack,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormValidationMsg from './FormValidationMsg';
import { Props } from './SignIn';

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordRepeat: string;
  seller: boolean;
};
const SIGNUP_REQUEST = gql`
  mutation SIGNUP_REQUEST(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      data: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        role: $role
      }
    ) {
      email
      id
    }
  }
`;

const SignUp = ({ setModalState }: Props) => {
  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
      firstname: '',
      lastname: '',
      seller: false,
    },
  });
  const password = watch('password');

  useEffect(() => {
    setFocus('firstname');
  }, [setFocus]);

  const [createUser] = useMutation(SIGNUP_REQUEST);
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const {
        data: {
          createUser: { id },
        },
      } = await createUser({
        variables: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          role: values.seller
            ? process.env.NEXT_PUBLIC_SELLER_ROLE_ID
            : process.env.NEXT_PUBLIC_CUSTOMER_ROLE_ID,
        },
      });
      if (id) {
        toast({
          title: 'Account created.',
          description:
            "We've created your account for you. You can sign in now",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex minH="60vh" align="center" justify="center" borderRadius="2xl">
      <Stack spacing={8} mx="auto" maxW="lg" py={10} px={{ base: 2, sm: 6 }}>
        <Stack align="center">
          <Heading fontSize="3xl" align="center">
            Sign Up to your account
          </Heading>
          <Text fontSize="lg" color="gray.600">
            to buy your favourite products ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={{ base: 4, sm: 8 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack pb={4}>
              <FormControl>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  {...register('firstname', {
                    required: 'First name is required',
                  })}
                />
                {errors.firstname && (
                  <FormValidationMsg errorMsg={errors.firstname.message} />
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  id="lastname"
                  type="lastname"
                  placeholder="Doe"
                  {...register('lastname', {
                    required: 'Last name is required',
                  })}
                />
                {errors.lastname && (
                  <FormValidationMsg errorMsg={errors.lastname.message} />
                )}
              </FormControl>
            </HStack>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
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
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      message:
                        'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character',
                    },
                  })}
                />
                {errors.password && (
                  <FormValidationMsg errorMsg={errors.password.message} />
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="passwordRepeat">Repeat Password</FormLabel>
                <Input
                  id="passwordRepeat"
                  type="password"
                  {...register('passwordRepeat', {
                    required: 'Password is required',
                    validate: {
                      matches: (value: string) =>
                        value === password || 'Passwords do not match',
                    },
                  })}
                />
                {errors.passwordRepeat && (
                  <FormValidationMsg errorMsg={errors.passwordRepeat.message} />
                )}
              </FormControl>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <FormControl>
                    <Flex alignItems="center">
                      <FormLabel htmlFor="seller" m={0} pr={4}>
                        Sign up as seller
                      </FormLabel>
                      <Checkbox {...register('seller')} id="seller" />
                    </Flex>
                  </FormControl>
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
                  loadingText="Submitting"
                >
                  Sign in
                </Button>
                <Box mt={2}>
                  <Button
                    variant="ghost"
                    color="blue.400"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => setModalState('signin')}
                  >
                    Already have an account? Sign In!
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

export default SignUp;
