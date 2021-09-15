import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { GrCart } from 'react-icons/gr';
import Link from 'next/link';
import { useUser } from '../User';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  openCart: () => void;
}
const MobileNav = ({ onOpen, openCart, ...rest }: MobileProps) => {
  const me = useUser();
  const bgHook = useColorModeValue('white', 'gray.900');
  const borderHook = useColorModeValue('gray.200', 'gray.700');
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
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
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Fabcart
      </Text>
      {me ? (
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            onClick={openCart}
            icon={<GrCart />}
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
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
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
                  <MenuItem>Sign out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <Box>
          <Button>Logout</Button>
          <Button>Login</Button>
        </Box>
      )}
    </Flex>
  );
};

export default MobileNav;