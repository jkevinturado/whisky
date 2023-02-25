import React from 'react';
import LoginForm from '../../components/Form/Auth/Login2';
import Header from '../../components/Header/Header2';

const LoginPage = () => {
  return (
    <>
      <Header />
      <div
        className='flex justify-center items-center bg-gray-100'
        style={{ height: '75vh' }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
