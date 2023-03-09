import React, { useContext } from 'react';
import Head from 'next/head';
import HeaderBar from './Header/Header';
import Navbar from './Navbar/Navbar';
import Modal from '../Dialogs/Modal';
import WishlistDrawer from '../Dialogs/wishlistDrawer';

const Header = ({ children }) => {
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
        <HeaderBar />
        <Navbar />
      </div>
      <Modal />
      <WishlistDrawer />

      <main>{children}</main>
    </>
  );
};

export default Header;
