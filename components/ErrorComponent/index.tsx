import React from 'react';
import { Flex, Heading, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { ApolloError } from '@apollo/client';

const ErrorComponent = ({ error }: { error: ApolloError }) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      h="80vh"
    >
      <Heading fontSize={{ base: 'lg', md: '2xl' }}>
        Oops some error occored.
      </Heading>
      <Text fontSize={{ base: 'sm', md: 'lg' }}>Error: {error.message}</Text>
      <Box w={{ base: '70%', md: '50%' }} maxW="24rem">
        <Image
          src="/images/blank-canvas.svg"
          width={100}
          height={100}
          layout="responsive"
          objectFit="contain"
        />
      </Box>
    </Flex>
  );
};

export default ErrorComponent;
