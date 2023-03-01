import { useContext } from 'react';

import Head from 'next/head';
import Header from '../components/Layout/index';
import '../styles/globals.css';

import { DialogContextProvider } from '../store/dialogContext';
import { UserContextProvider } from '../store/userContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <DialogContextProvider>
        <UserContextProvider>
          <Head>
            <title>Project Whisky</title>
            <meta
              name='description'
              value='A ecommerce selling Pc components/parts, laptops, peripheral, etc. Built in NextJs/React, Tailwindcss, firebase'
            />
          </Head>
          <Header>
            <Component {...pageProps} />
          </Header>
        </UserContextProvider>
      </DialogContextProvider>
    </>
  );
}
