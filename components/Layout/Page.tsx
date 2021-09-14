import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import Header from '../Header/Header';

const Page = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header
        cartProps={{
          isOpen,
          onOpen,
          onClose,
        }}
      >
        {children}
      </Header>
    </>
  );
};

export default Page;
