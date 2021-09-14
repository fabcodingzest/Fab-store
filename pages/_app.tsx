import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
  addApolloState,
  initializeApollo,
  useApollo,
} from '../with-apollo/apolloClient';
import { CURRENT_USER_QUERY } from '../components/User';
import Page from '../components/Layout/Page';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  return addApolloState(apolloClient, {
    props: { query },
  });
}

export default MyApp;
