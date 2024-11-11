import { getApolloClient } from '@/utils/apollo-client';
import { gql } from '@apollo/client';
import { Character } from '@/types/characters';

export type CharactersResult = Awaited<ReturnType<typeof getCharacters>>;

export const getCharacters = async (page: number) => {
  const client = getApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: ${page}) {
          info {
            pages
          }
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
          }
        }
      }
    `,
  });
  const pages: number = data.characters.info.pages || 0;
  const characters: Character[] = data.characters.results;
  return {
    characters,
    pages,
  };
};
