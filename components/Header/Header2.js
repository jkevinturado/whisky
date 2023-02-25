import React from 'react';

const Header = () => {
  return (
    <header className='sticky  w-full shadow-md shadow-emerald-100 top-0 left-0 bg-white'>
      <div
        className='flex justify-between items-center w-full'
        style={{ height: '8vh' }}
      >
        <a href=''>
          <h1 className='text-bold text-3xl text-black ml-8'>Whisky</h1>
        </a>
      </div>
    </header>
  );
};

export default Header;
