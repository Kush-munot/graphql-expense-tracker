/* eslint-disable @next/next/no-page-custom-font */
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { AppProps } from 'next/app'; // Import types for Next.js
import Head from 'next/head';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: '/',
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </ApolloProvider>

    );
}

export default MyApp;
