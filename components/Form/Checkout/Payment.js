import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '../../../store/userContext';
import { getProductDetails } from '../../../utils/firebase';
import { currencyFormatter } from '../../../utils/format';

import OrderSummary from './OrderSummary';
import { Disclosure, RadioGroup } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const plan = [
  { name: 'cod', title: 'Cash on Delivery' },
  { name: 'card', title: 'Debit/Credit Card' },
  { name: 'paypal', title: 'Paypal' },
  { name: 'gcash', title: 'Gcash' },
];

function Payment() {
  const { user, cart, cartItemCount, removeCartItem, updateCartItem } =
    useAuth();
  const [paymentMode, setPaymentMode] = useState();
  const [cartproducts, setCartproducts] = useState([]);

  useEffect(() => {
    const cartproductdetails = async () => {
      let data = await getProductDetails(cart);
      setCartproducts(data.productdetails);
    };

    if (cart) {
      cartproductdetails();
    }
  }, [cart]);

  return (
    <div className='flex flex-col space-y-6 p-4'>
      <h3 className='text-xl font-medium'>CART ITEMS</h3>
      <hr />
      <div className='flex'>
        <div className='flex w-3/5 flex-col '>
          <div className='w-full px-4 pt-16'>
            <div className='mx-auto w-full max-w-md rounded-2xl bg-white p-2'>
              <div className='w-full px-4 py-16'>
                <div className='mx-auto w-full max-w-md'>
                  <RadioGroup value={paymentMode} onChange={setPaymentMode}>
                    <RadioGroup.Label className='sr-only'>
                      Server size
                    </RadioGroup.Label>
                    <div className='space-y-2'>
                      {plans.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                : ''
                            }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                  <div className='text-sm'>
                                    <RadioGroup.Label
                                      as='p'
                                      className={`font-medium  ${
                                        checked ? 'text-white' : 'text-gray-900'
                                      }`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className={`inline ${
                                        checked
                                          ? 'text-sky-100'
                                          : 'text-gray-500'
                                      }`}
                                    >
                                      <span>
                                        {plan.ram}/{plan.cpus}
                                      </span>{' '}
                                      <span aria-hidden='true'>&middot;</span>{' '}
                                      <span>{plan.disk}</span>
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='shrink-0 text-white'>
                                    <CheckIcon className='h-6 w-6' />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                      <span>CASH ON DELIVERY</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      No online payment needed – pay in cash using the exact
                      change once your items are delivered! Your bank account
                      details will only be required if you wish to return
                      anything for a refund.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as='div' className='mt-2'>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                      <span>CREDIT/DEBIT CARD</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      No.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure> */}
            </div>
          </div>
        </div>
        <div className='w-2/5 px-3'>
          <OrderSummary />
        </div>
      </div>
      <button className='border-2 w-full p-4 text-center inline-flex justify-center items-center '>
        Place Order
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
    </div>
  );
}

export default Payment;
