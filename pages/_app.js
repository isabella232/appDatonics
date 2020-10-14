import App from 'next/app';
import Head from 'next/head';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import { ApolloProvider } from 'react-apollo';
import '../components/layouts/styles/content.css';
import '../components/layouts/styles/header.css';
import '../components/layouts/styles/sidebar.css';
import '../styles/card.css';
import '../styles/styles.css';

const fetch = require('node-fetch').default;

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
  fetch:fetch
});


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
    return (
      <React.Fragment>
        <Head>
          <title>Datonics App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider> 
      </React.Fragment>
    );
  }
}

export default MyApp;