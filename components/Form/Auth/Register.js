import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  FirebaseCreateUser,
  FirebaseSaveUsertoDB,
  GetFirebaseUsersDB,
  GetFirebaseCurrentUser,
  FirebaseGoogleSignIn,
  FirebaseFacebookSignIn,
} from '../../../utils/firebase';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const FormLogin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState({
    startDate: null,
    endDate: null,
  });
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const userdata = await GetFirebaseUsersDB();
      const currentUser = GetFirebaseCurrentUser();
      console.log(currentUser);
    };
    getUsers();
    setSubmitted(false);
  }, [submitted]);

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setBirthdate(newValue);
  };

  const SaveUser = async () => {
    const userdata = {
      firstName,
      lastName,
      birthdate,
      gender,
      email,
      password,
    };

    console.log(userdata);
    await FirebaseCreateUser(email, password);
    await FirebaseSaveUsertoDB(userdata);
    setSubmitted(true);
  };

  return (
    <>
      <div className='max-w-sm md:w-9/12 mx-auto h-full bg-white border rounded-lg shadow-lg shadow-gray-300'>
        <div className='p-8 space-y-4 md:space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Registration
          </h1>
          <div className='space-y-4 md:space-y-6' action='#'>
            <div>
              <p className='text-sm text-gray-600 font-medium'>Sign up with</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='w-1/2'>
                <button
                  className='btn-primary bg-blue-900'
                  onClick={FirebaseFacebookSignIn}
                >
                  <FacebookIcon className='text-white' />
                  Facebook
                </button>
              </div>
              <div className='w-1/2'>
                <button
                  className='btn-primary bg-red-500'
                  onClick={FirebaseGoogleSignIn}
                >
                  <GoogleIcon className='text-white' />
                  Google
                </button>
              </div>
            </div>
            <div class='inline-flex  items-center justify-center w-full'>
              <hr class='w-full h-px my-2 bg-slate-300 border-0 dark:bg-gray-700' />
              <span class='absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900'>
                Or
              </span>
            </div>
            <div>
              <label htmlFor='firstname' className='form-label'>
                First name
              </label>
              <input
                type='text'
                name='firstname'
                id='firstname'
                className='form-textbox'
                placeholder='Enter you First name'
                required={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='lastname' className='form-label'>
                Last name
              </label>
              <input
                type='text'
                name='lastname'
                id='lastname'
                className='form-textbox'
                placeholder='Enter you Last name'
                required={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='birthdate' className='form-label'>
                Birthdate
              </label>
              <div>
                <Datepicker
                  placeholder={'Enter birth date'}
                  asSingle={true}
                  useRange={false}
                  value={birthdate}
                  onChange={handleValueChange}
                />
              </div>
            </div>
            {/* <div>
              <label htmlFor='product_category' class='form-label'>
                Gender
              </label>
              <select
                id='product_category'
                class='form-textbox'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option selected>Choose Gender</option>
                <option key='male' value='male'>
                  Male
                </option>
                <option key='female' value='female'>
                  Female
                </option>
              </select>
            </div> */}
            <div>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-textbox'
                placeholder='Enter you email'
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='form-textbox'
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='button'
              onClick={() => SaveUser()}
              className='form-button-primary '
            >
              Register
            </button>
            <p className='text-sm font-light text-gray-500 '>
              Already have an account?
              <Link
                href='/auth/login'
                className='font-medium text-emerald-500 hover:underline '
              >
                Click here to Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
