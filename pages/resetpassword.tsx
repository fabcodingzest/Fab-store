import { useMutation, gql } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormValidationMsg from '../components/Authentication/FormValidationMsg';
import Modal from '../components/Authentication/Modal';

type FormValues = {
  password: string;
  passwordRepeat: string;
};

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($password: String!, $token: String!) {
    resetPasswordUser(password: $password, token: $token) {
      user {
        email
      }
    }
  }
`;

const ResetPasswordPage = () => {
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
  const { query } = useRouter();
  console.log(query);

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const [reset] = useMutation(RESET_PASSWORD_MUTATION);

  const toast = useToast();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      console.log(query.token);

      if (query.token) {
        const {
          data: {
            resetPasswordUser: { user },
          },
        } = await reset({
          variables: {
            password: values.password,
            token: query.token,
          },
        });

        if (user) {
          toast({
            title: 'Password Reset Successful.',
            description: 'You can now sign in with the new password',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
          });
        }
      }
      throw new Error('Ooops you do not have the token to reset your password');
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Flex align="center" justifyContent="center" minH="80vh">
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
                <FormControl id="password">
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Input
                    autoComplete="new-password"
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
                <FormControl id="passwordRepeat">
                  <FormLabel htmlFor="passwordRepeat">
                    Repeat New Password
                  </FormLabel>
                  <Input
                    autoComplete="new-password"
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
                    <FormValidationMsg
                      errorMsg={errors.passwordRepeat.message}
                    />
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
                <Modal modalState="signin" />
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default ResetPasswordPage;
