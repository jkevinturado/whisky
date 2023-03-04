import { useContext } from 'react';

import Header from '../components/Layout/index';
import '../styles/globals.css';

import { DialogContextProvider } from '../store/dialogContext';
import { UserContextProvider } from '../store/userContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <DialogContextProvider>
        <UserContextProvider>
          <Header>
            <Component {...pageProps} />
          </Header>
        </UserContextProvider>
      </DialogContextProvider>
    </>
  );
}
