import React from 'react';
import RegisterForm from '../../components/Form/Auth/Register';
import Header from '../../components/Layout/Header/Header2';

const RegisterPage = () => {
  return (
    <>
      <div className='flex justify-center w-full items-center h-full bg-gray-100'>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
