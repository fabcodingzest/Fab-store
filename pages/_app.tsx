import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { useApollo } from '../with-apollo/apolloClient';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
