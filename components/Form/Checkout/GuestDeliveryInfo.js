import React from 'react';

import OrderSummary from './OrderSummary';

function GuestDeliveryInfo() {
  return (
    <form action='#' className='flex flex-col space-y-6 p-4'>
      <h3 className='text-xl font-medium'>SHIPPING INFO</h3>
      <hr />
      <div className='flex'>
        <div className='flex w-3/5 flex-col space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='w-full'>
              <input
                type='text'
                name='product_name'
                id='product_name'
                className='form-textbox-secondary'
                placeholder='First Name'
              />
            </div>
            <div className='w-full'>
              <input
                type='text'
                name='product_name'
                id='product_name'
                className='form-textbox-secondary'
                placeholder='Last Name'
              />
            </div>
          </div>
          <div>
            <input
              type='text'
              name='product_name'
              id='product_name'
              className='form-textbox-secondary'
              placeholder='Address 1'
            />
          </div>
          <div>
            <input
              type='text'
              name='product_name'
              id='product_name'
              className='form-textbox-secondary'
              placeholder='Address 2'
            />
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            <div>
              <select id='product_category' className='form-textbox-secondary'>
                <option value='Province'>Province</option>
              </select>
            </div>
            <div>
              <select id='product_category' className='form-textbox-secondary'>
                <option value='Province'>City</option>
              </select>
            </div>
          </div>
          <div>
            <input
              type='text'
              name='product_name'
              id='product_name'
              className='form-textbox-secondary'
              placeholder='Postal Code'
            />
          </div>
          <h3 className='text-xl font-medium mb-4'>CONTACT INFO.</h3>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='w-full'>
              <input
                type='text'
                name='product_name'
                id='product_name'
                className='form-textbox-secondary'
                placeholder='Email Address'
              />
            </div>
            <div className='w-full'>
              <input
                type='text'
                name='product_name'
                id='product_name'
                className='form-textbox-secondary'
                placeholder='Contact Number'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-2/5 px-3 '>
          <OrderSummary />
        </div>
      </div>
      <button className='border-2 w-full p-4 text-center inline-flex justify-center items-center '>
        Proceed to Payment
        <span className='ml-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
            />
          </svg>
        </span>
      </button>
    </form>
  );
}

export default GuestDeliveryInfo;
