import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { AppContext, AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { NextPageContext } from 'next';
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

type MyAppPageProps = {
  query?: NextPageContext['query'];
};

MyApp.getInitialProps = async function (context) {
  const { Component, ctx } = context;
  let pageProps: MyAppPageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withApollo(MyApp);
