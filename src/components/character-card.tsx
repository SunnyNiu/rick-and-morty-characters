'use client';
import {
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Tr,
  VStack,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Character } from '@/types/characters';

type CharacterCardProps = {
  character: Character;
  onClick?: (character: Character) => void;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { id, image, name, status, species, type, gender, origin, location } =
    character;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        key={id}
        cursor="pointer"
        onClick={() => setIsOpen(true)}
        width={{ base: '100%', md: 'md' }}
      >
        <CardBody>
          <VStack justifyContent="center" gap={3}>
            <Image
              src={image}
              pointerEvents="none"
              width="100%"
              alt={name}
              fallbackSrc="/default.jpeg"
            />
            <Tag>{name}</Tag>
          </VStack>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer pb={3} overflow="hidden">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Name</Th>
                    <Td>
                      <Tooltip label={name}>{name}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>status</Th>
                    <Td>
                      <Tooltip label={status}>{status}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>species</Th>
                    <Td>
                      <Tooltip label={species}>{species}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>type</Th>
                    <Td>
                      <Tooltip label={type}>{type}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>gender</Th>
                    <Td>
                      <Tooltip label={gender}>{gender}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>origin</Th>
                    <Td>
                      <Tooltip label={origin.name}>{origin.name}</Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>location</Th>
                    <Td>
                      <Tooltip label={location.name}>
                        <Text overflow="clip">{location.name}</Text>
                      </Tooltip>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
