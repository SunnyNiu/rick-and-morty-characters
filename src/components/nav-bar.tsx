'use client';
import { Avatar, HStack, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { User } from '@/types/user';
import UserModal from '@/components/user-modal';
import { useState } from 'react';

type NavBarProps = {
  user: User | undefined;
};

export default function NavBar({ user }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <HStack
      width="100%"
      justifyContent="end"
      backgroundColor={useColorModeValue('white', 'white')}
    >
      <UserModal isOpen={isOpen} onClose={onClose} user={user} />
      {user && (
        <Tooltip label="Edit profile" aria-label="Edit profile">
          <Avatar
            cursor="pointer"
            m={1}
            variant="subtle"
            name={user.username}
            onClick={() => setIsOpen(true)}
          />
        </Tooltip>
      )}
    </HStack>
  );
}
