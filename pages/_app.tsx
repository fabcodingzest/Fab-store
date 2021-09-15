import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import App, { AppContext, AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Page from '../components/Layout/Page';
import withApollo from '../with-apollo/apolloClient';

type MyAppProps = AppProps & {
  apollo: ApolloClient<NormalizedCacheObject>;
};

const MyApp = ({
  Component,
  pageProps,
  apollo,
}: MyAppProps): React.ReactElement => {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ChakraProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(MyApp);
