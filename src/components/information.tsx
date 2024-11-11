import { Flex, VStack } from '@chakra-ui/react';
import { getUser } from '@/libs/user';
import Pagination from '@/components/pagination';
import {
  CharactersResult,
  getCharacters,
} from '@/libs/rick-and-morty/characters';
import { CharacterCard } from '@/components/character-card';

export default async function Information({ page }: { page: number }) {
  const user = await getUser();
  let charactersResult: CharactersResult = {
    characters: [],
    pages: 0,
  };
  if (user) {
    charactersResult = await getCharacters(page);
  }
  const { characters, pages } = charactersResult;
  return (
    <VStack gap={10} p={8} justifyContent="center">
      <Flex flexWrap="wrap" gap={5} justifyContent="center">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Flex>
      <Pagination pages={pages} />
    </VStack>
  );
}
