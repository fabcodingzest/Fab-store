import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  DrawerOverlay,
  Container,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

export default function Header({
  children,
  cartProps,
}: {
  children: ReactNode;
  cartProps: UseDisclosureProps;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: cartOpen, onClose: closeCart, onOpen: openCart } = cartProps;

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Drawer
        placement="right"
        isOpen={cartOpen}
        onClose={closeCart}
        onOverlayClick={closeCart}
        autoFocus
        size="sm"
        closeOnEsc
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.200">
            <Flex justifyContent="space-between" p="30">
              Hello brother
              <CloseButton onClick={closeCart} />
            </Flex>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} openCart={openCart} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Container maxW="container.xl" py={{ base: 2, md: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
