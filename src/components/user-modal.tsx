import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { saveUser as saveUserAction } from '@/actions/user-actions';
import { User } from '@/types/user';
import React, { useEffect, useState } from 'react';

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | undefined;
};

const EMPTY_USER: User = { username: '', jobTitle: '' };

export default function UserModal({
  isOpen,
  onClose,
  user: existingUser,
}: UserModalProps) {
  const initialRef = React.useRef(null);

  const [user, setUser] = useState(existingUser || EMPTY_USER);
  const [error, setError] = useState('');

  // reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setError('');
      setUser(existingUser || EMPTY_USER);
    }
  }, [existingUser, isOpen]);

  const saveUser = async () => {
    const response = await saveUserAction(user);
    if (!response.success) {
      setError(response.message);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen || !existingUser}
      onClose={onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {existingUser ? 'Update user' : 'Create user'}
        </ModalHeader>
        {existingUser && <ModalCloseButton />}

        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Smith"
                value={user?.username || ''}
                onChange={(e) =>
                  setUser((user) => ({ ...user, username: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Job Title</FormLabel>
              <Input
                placeholder="Software Engineer"
                value={user?.jobTitle || ''}
                onChange={(e) =>
                  setUser((user) => ({ ...user, jobTitle: e.target.value }))
                }
              />
            </FormControl>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={saveUser}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
