import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import Link from 'next/link';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import { FiChevronDown, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useMutation, gql } from '@apollo/client';

import Modal from '../Authentication/Modal';
import { CURRENT_USER_QUERY, useUser } from '../User';

const LOGOUT_USER_MUTATION = gql`
  mutation LOGOUT_USER_MUTATION {
    logoutUser
  }
`;

interface MobileProps extends FlexProps {
  onOpen: () => void;
  openCart: () => void;
}
const MobileNav = ({ onOpen, openCart, ...rest }: MobileProps) => {
  const me = useUser();
  const [logoutUser] = useMutation(LOGOUT_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const bgHook = useColorModeValue('white', 'gray.900');
  const borderHook = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      ml={{ base: 0, md: '12rem' }}
      px={{ base: 2, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgHook}
      borderBottomWidth="1px"
      borderBottomColor={borderHook}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color="gray.200"
        _hover={{ bg: 'gray.200', color: 'gray.800' }}
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'none', sm: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link href="/">Fabcart</Link>
      </Text>
      {me ? (
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open cart"
            color="gray.200"
            _hover={{ bg: 'gray.200', color: 'gray.800' }}
            onClick={openCart}
            icon={<FiShoppingCart />}
          />

          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                    color="gray.200"
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.400">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown color="white" />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={bgHook} borderColor={borderHook}>
                <Link href="/hello">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link href="/products">
                  <MenuItem>Orders</MenuItem>
                </Link>
                <Link href="/hello">
                  <MenuItem>Wishlist</MenuItem>
                </Link>
                <MenuDivider />
                <Link href="/hello">
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <HStack>
          <Box>
            <Modal modalState="signin" />
          </Box>
          <Box>
            <Modal modalState="signup" />
          </Box>
        </HStack>
      )}
    </Flex>
  );
};

export default MobileNav;
