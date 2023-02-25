import React from 'react';

const Header = () => {
  return (
    <>
      <header className='header sticky top-0 left-0 mb-2'>
        <div className='hidden md:flex justify-between items-center p-5 w-full'>
          <div className='logo-header w-1/3 flex justify-center'>
            <a href=''>
              <h1 className='text-bold text-3xl text-black'>Whisky</h1>
            </a>
          </div>
          <div className='search-bar-header w-1/3 flex justify-center'>
            <input
              type='text'
              name='search'
              id=''
              className='w-full  border border-gray-300 bg-gray-50 hover:outline-gray-400 active:outline-gray-400 focus:outline-gray-400 text-lg'
            />
            <button className='w-1/3 p-1  border border-gray-300 bg-gray-50 text-black text-lg hover:bg-gray-400'>
              Search
            </button>
          </div>
          <div className='auth-bar-header w-1/3 flex justify-center'>
            <button className='login-btn w-1/6  hover:bg-gray-200 hover:text-white text-md text-emerald-400 border-r border-slate-200'>
              Login
            </button>
            <button className='register-btn w-1/6 hover:bg-gray-200 hover:text-white text-md text-emerald-400 '>
              Sign-up
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
