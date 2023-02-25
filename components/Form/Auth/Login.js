import React from 'react';
import Image from 'next/image';
import Header from '../../Header/index';

const FormLogin = () => {
  return (
    <>
      <div className='max-w-sm md:max-w-md mx-auto h-full bg-white border rounded-lg shadow-lg shadow-gray-300'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Welcome to Whisky, Please Login
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            <div>
              <label
                for='email'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder='name@company.com'
                required=''
              />
            </div>
            <div>
              <label
                for='password'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                required=''
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='remember'
                    aria-describedby='remember'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 '
                    required=''
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label for='remember' className='text-gray-500 '>
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href='#'
                className='text-sm font-medium text-primary-600 hover:underline '
              >
                Forgot password?
              </a>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-emerald-500 hover:bg-emerald-400 hover:ring-4 hover:ring-offset-1 hover:outline-none focus:ring-emerald-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500 '>
              Don’t have an account yet?
              <a
                href='#'
                className='font-medium text-emerald-500 hover:underline '
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
