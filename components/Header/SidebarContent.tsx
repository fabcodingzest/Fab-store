import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { Divider } from '@chakra-ui/layout';
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
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex direction="column" justifyContent="space-between" h="full">
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Fabcart
            </Text>
            <CloseButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onClose}
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Text p={{ base: 2, md: 6 }} align="center">
          © 2021{' '}
          <Link
            color="blue.500"
            href="https://github.com/fabcodingzest"
            isExternal
          >
            Fab Rizvi
          </Link>
          .
          <br /> All rights reserved
        </Text>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
