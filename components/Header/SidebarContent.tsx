import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link as ChakraLink,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';
import { FiCompass, FiHeart, FiHome, FiTrendingUp } from 'react-icons/fi';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'WishList', icon: FiHeart },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('gray.900', 'white')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.700', 'gray.200')}
      w={{ base: '10rem', md: '12rem' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex direction="column" justifyContent="space-between" h="full">
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="2"
            justifyContent="space-between"
          >
            <Text
              fontSize={{ base: 'lg', md: '2xl' }}
              fontFamily="monospace"
              fontWeight="bold"
              color="gray.800"
              bg="gray.200"
              px="3"
              py={{ base: 1, md: 2 }}
              borderBottomRightRadius={{ base: 'xl', md: '3xl' }}
              borderTopLeftRadius={{ base: 'xl', md: '3xl' }}
              onClick={() => onClose()}
              mx="auto"
            >
              <Link href="/">Fabcart</Link>
            </Text>
            <CloseButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onClose}
              color="gray.200"
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem onClose={onClose} key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Text
          p={{ base: 2, md: 6 }}
          align="center"
          fontSize="xs"
          color="gray.400"
        >
          © 2021{' '}
          <ChakraLink
            color="blue.500"
            href="https://github.com/fabcodingzest"
            isExternal
          >
            Fab Rizvi
          </ChakraLink>
          .
          <br /> All rights reserved
        </Text>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
