import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  useColorModeValue,
  Box,
  FormLabel,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import FormValidationMsg from './FormValidationMsg';
import { Props } from './SignIn';

type ForgotPasswordFormInputs = {
  email: string;
};

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ($email: String!) {
    forgotPasswordUser(email: $email)
  }
`;

const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  ) || 'Enter a valid email address';

const ForgotPassword = ({ setModalState }: Props): JSX.Element => {
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);
  const toast = useToast();

  const [forgotPasswordUser] = useMutation(FORGOT_PASSWORD_MUTATION);
  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (values) => {
    try {
      await forgotPasswordUser({ variables: values });
      toast({
        description:
          'You will recieve the password reset link if your account with the provided email exists!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    validate: {
                      isEmail: (value) => isValidEmail(value),
                    },
                  })}
                />
                {errors.email && (
                  <FormValidationMsg errorMsg={errors.email.message} />
                )}
              </FormControl>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                disabled={!isValid || !isDirty || isSubmitting}
                isLoading={isSubmitting}
                loadingText="Sending email"
              >
                Send Email
              </Button>
              <Button
                variant="ghost"
                color="blue.400"
                _hover={{ textDecoration: 'underline' }}
                onClick={() => setModalState('signin')}
              >
                Go back to sign in
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
