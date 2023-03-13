import React, { useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HeaderBar from './Header/Header';
import Header2 from './Header/Header2';
import Navbar from './Navbar/Navbar';
import Modal from '../Dialogs/Modal';
import WishlistDrawer from '../Dialogs/wishlistDrawer';

const Header = ({ children }) => {
  const { pathname } = useRouter();
  console.log(pathname.split('/')[1]);
  return (
    <>
      <Head>
        <title>Project Whisky</title>
        <meta
          name='description'
          value='A ecommerce selling Pc components/parts, laptops, peripheral, etc. Built in NextJs/React, Tailwindcss, firebase'
        />
      </Head>
      <div className='bg-white flex flex-col ' style={{ height: '17vh' }}>
        {pathname.split('/')[1] === 'checkout' ||
        pathname.split('/')[1] === 'auth' ? (
          <Header2 />
        ) : (
          <>
            <HeaderBar />
            <Navbar />
          </>
        )}
      </div>
      <Modal />
      <WishlistDrawer />

      <main>{children}</main>
    </>
  );
};

export default Header;
