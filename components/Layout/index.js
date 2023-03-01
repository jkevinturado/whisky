import React, { useContext } from 'react';
import HeaderBar from './Header/Header';
import Navbar from './Navbar/Navbar';
import Modal from '../Dialogs/Modal';

const Header = ({ children }) => {
  return (
    <>
      <div className='bg-white flex flex-col ' style={{ height: '17vh' }}>
        <HeaderBar />
        <Navbar />
      </div>
      <Modal />

      <main>{children}</main>
    </>
  );
};

export default Header;
