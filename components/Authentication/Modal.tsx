import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  ModalCloseButton,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const AuthModal = ({ modalState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState(modalState);

  return (
    <>
      <Button
        // size="xs"
        py={5}
        px={{ base: 4, sm: 6 }}
        onClick={onOpen}
        colorScheme="blue"
      >
        <Text fontSize={{ base: 'xs', sm: 'md' }}>
          {modalState === 'signin' ? 'Sign In' : 'Sign Up'}
        </Text>
      </Button>

      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => setModal(modalState)}
        onOverlayClick={() => setModal(modalState)}
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('gray.50', 'gray.800')}>
          <ModalBody>
            {modal === 'signin' ? (
              <SignIn setModalState={setModal} onClose={onClose} />
            ) : modal === 'signup' ? (
              <SignUp setModalState={setModal} onClose={onClose} />
            ) : (
              modal === 'forgotpassword' && (
                <ForgotPassword setModalState={setModal} onClose={onClose} />
              )
            )}
          </ModalBody>
          <ModalCloseButton onClick={() => setModal(modalState)} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
