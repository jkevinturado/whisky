import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import { useAuth } from '../../../store/userContext';

const FormLogin2 = (props) => {
  const router = useRouter();
  const { user, login, signInWithFaceBook, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInWithEmailandPass = async () => {
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [router, user]);

  return (
    <div className='block w-11/12 md:flex lg:w-8/12 xl:w-6/12 justify-center items-center bg-white border rounded-lg shadow-lg shadow-gray-300'>
      <div className='w-full md:w-1/2 '>
        <div className='p-4 md:p-10 space-y-4 md:space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Welcome to Whisky
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Login with Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder='name@company.com'
                required=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='password'
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <label htmlFor='remember' className='text-gray-500 '>
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
              onClick={handleSignInWithEmailandPass}
              type='submit'
              className='w-full text-white bg-emerald-500 hover:bg-emerald-400 hover:ring-4 hover:ring-offset-1 hover:outline-none focus:ring-emerald-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500 '>
              Don’t have an account yet?
              <Link
                href='/auth/register'
                className='font-medium text-emerald-500 hover:underline '
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className='inline-flex md:hidden items-center justify-center w-full'>
        <hr className='w-4/5 h-px my-8 bg-slate-300 border-0 dark:bg-gray-700' />
        <span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900'>
          Or
        </span>
      </div>
      <div className='hidden md:block relative flex-col items-center justify-center'>
        <div className='after:block after:bg-slate-300 after:w-[1px] after:h-48 after:mx-auto after:my-2'></div>
        <div className='after:block after:bg-slate-300 after:w-[1px] after:h-48 after:mx-auto after:my-2'>
          <span className='text-gray-400'>Or</span>
        </div>
      </div>
      <div className='w-full md:w-1/2'>
        <div className='p-4 md:p-10 space-y-4 md:space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Login with
          </h1>

          <button
            type='button'
            onClick={signInWithFaceBook}
            className='w-full text-gray-500 border-2 p-2 rounded-full border-emerald-500 shadow-lg'
          >
            <FacebookIcon className='text-blue-900' />
            Facebook
          </button>
          <button
            type='button'
            onClick={signInWithGoogle}
            className='w-full text-gray-500 border-2 p-2 rounded-full border-emerald-500 shadow-lg'
          >
            <GoogleIcon className='text-red-500' />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormLogin2;
