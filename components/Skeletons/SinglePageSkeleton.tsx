import { Flex, Skeleton, Stack, SkeletonText } from '@chakra-ui/react';

const SinglePageSkeleton = () => {
  return (
    <Flex
      bg="white"
      rounded="lg"
      height={{ base: 500, sm: 390 }}
      p={4}
      alignItems="start"
      justifyContent="center"
      direction={{ base: 'column', sm: 'row' }}
      maxW="4xl"
      mx="auto"
    >
      <Skeleton
        height={{ base: 300, md: 350 }}
        width="full"
        mx="auto"
        maxW="16rem"
      />
      <Stack
        mx={{ sm: 8 }}
        my={{ base: 4, sm: 0 }}
        spacing={6}
        width="full"
        maxW="24rem"
      >
        <Skeleton height={5} width="full" />
        <Skeleton height={3} width={10} />
        <Skeleton height={2} width={20} />
        <SkeletonText />
      </Stack>
    </Flex>
  );
};

export default SinglePageSkeleton;
