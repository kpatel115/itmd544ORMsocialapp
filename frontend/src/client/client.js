import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000', // Adjust this to the URL of your GraphQL server
  }),
  cache: new InMemoryCache()
});

export default client;
