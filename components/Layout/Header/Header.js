import React from 'react';
import Link from 'next/link';

import { useAuth } from '../../../store/userContext';

const Header = () => {
  const { user, logout } = useAuth();

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
          {!user && (
            <div className='auth-bar-header w-1/3 flex justify-center'>
              <Link
                href='/auth/login'
                className='login-btn w-1/6  hover:bg-gray-200 hover:text-white text-md text-emerald-400 border-r border-slate-200'
              >
                Login
              </Link>
              <Link
                href='/auth/register'
                className='register-btn w-1/6 hover:bg-gray-200 hover:text-white text-md text-emerald-400 '
              >
                Sign-up
              </Link>
            </div>
          )}
          {user && (
            <>
              <div className='user-profile-menu w-1/3 flex justify-center items-center space-x-4'>
                <div className='font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700'>
                  <a href='#' className='relative flex' role='buton'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-8 h-8 '
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                      />
                    </svg>
                    <span className='absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center'>
                      5
                    </span>
                  </a>
                </div>
                <button
                  onClick={logout}
                  className='login-btn btn-primary w-24  hover:bg-emerald-200 hover:text-white hover:border-none text-md text-emerald-400 border-emerald-400'
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
