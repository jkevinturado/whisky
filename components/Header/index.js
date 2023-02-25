import React from 'react';
import HeaderBar from './Header';
import Navbar from './Navbar';

const Header = ({ children }) => {
  return (
    <>
      <div className='bg-white flex flex-col ' style={{ height: '17vh' }}>
        <HeaderBar />
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default Header;
