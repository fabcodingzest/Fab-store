import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import SignIn from './SignIn';

const SignInModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        py={{ base: 4, sm: 5 }}
        px={{ base: 4, sm: 6 }}
        onClick={onOpen}
        colorScheme="blue"
      >
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('gray.50', 'gray.800')}>
          <ModalCloseButton />
          <ModalBody>
            <SignIn />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInModal;
