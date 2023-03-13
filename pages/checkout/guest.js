import React from 'react';

import GuestDeliveryInfo from '../../components/Form/Checkout/GuestDeliveryInfo';
import Review from '../../components/Form/Checkout/Review';
import Payment from '../../components/Form/Checkout/Payment';

function GuestCheckOut() {
  return (
    <section className='flex justify-center items-center'>
      <div className='w-4/5 wrapper p-2 border border-gray-200 '>
        <ol class='flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border-b border-gray-200  dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4'>
          <li class='flex items-center text-blue-600 dark:text-blue-500'>
            <span class='flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500'>
              1
            </span>
            Review
            <svg
              aria-hidden='true'
              class='w-4 h-4 ml-2 sm:ml-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 5l7 7-7 7M5 5l7 7-7 7'
              ></path>
            </svg>
          </li>
          <li class='flex items-center'>
            <span class='flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400'>
              2
            </span>
            Delivery
            <svg
              aria-hidden='true'
              class='w-4 h-4 ml-2 sm:ml-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 5l7 7-7 7M5 5l7 7-7 7'
              ></path>
            </svg>
          </li>
          <li class='flex items-center'>
            <span class='flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400'>
              3
            </span>
            Payment
            <svg
              aria-hidden='true'
              class='w-4 h-4 ml-2 sm:ml-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 5l7 7-7 7M5 5l7 7-7 7'
              ></path>
            </svg>
          </li>
          <li class='flex items-center'>
            <span class='flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400'>
              4
            </span>
            Complete
          </li>
        </ol>
        <Payment />
        <Review />
        <GuestDeliveryInfo />
      </div>
    </section>
  );
}

export default GuestCheckOut;
