import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { RestLink } from 'apollo-link-rest';
import { endpoint, prodEndpoint } from '../config';
// import paginationField from './paginationField';

const restLink = new RestLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
});

function createClient({ headers, initialState }) {
  return new ApolloClient({
    ssrMode: typeof window === undefined,
    link: ApolloLink.from([
      restLink,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO:
            // allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
    connectToDevTools: true,
    // Not working anymore => Default options to disable SSR for all queries.
  });
}

export default withApollo(createClient, { getDataFromTree });
