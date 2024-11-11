import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
        'https://rickandmortyapi.com/graphql',
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
}
