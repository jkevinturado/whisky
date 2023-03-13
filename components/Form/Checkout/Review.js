import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '../../../store/userContext';
import { getProductDetails } from '../../../utils/firebase';

import OrderSummary from './OrderSummary';

import { currencyFormatter } from '../../../utils/format';

function Review() {
  const { user, cart, cartItemCount, removeCartItem, updateCartItem } =
    useAuth();
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
          <div className='cart-items'>
            <ul className='space-y-8'>
              {cartproducts.length > 0 &&
                cartproducts.map(
                  ({
                    productid,
                    quantity,
                    productdetails: { name, price, thumbnailfile, stocks },
                  }) => (
                    <li
                      key={productid}
                      className='flex items-start font-light my-5 space-x-2'
                    >
                      <div className='flex w-3/12 h-28 object-fill border-2 border-gray-200'>
                        <Image
                          src={thumbnailfile}
                          width={800}
                          height={800}
                          alt={name}
                        />
                      </div>
                      <div className='flex flex-col space-y-1 w-9/12'>
                        <div className='font-medium text-sm'>{name}</div>
                        <div className='text-sm'>
                          {currencyFormatter.format(price)}
                        </div>
                        <div className='flex items-center'>
                          <div className='flex justify-start items-center w-6/12 text-sm'>
                            <div className='mr-2'>Qty: </div>
                            <div className='flex justify-center items-center'>
                              <button
                                onClick={() => updateCartItem(productid, 1)}
                                className='border border-gray-300'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='w-3 h-3'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 4.5v15m7.5-7.5h-15'
                                  />
                                </svg>
                              </button>
                              <div className=' mx-2'>{quantity}</div>
                              <button
                                onClick={() => updateCartItem(productid, -1)}
                                className='border border-gray-300'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='w-3 h-3'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M19.5 12h-15'
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className='flex w-6/12 justify-end items-center'>
                            <button
                              onClick={() => removeCartItem(productid)}
                              className='text-emerald-500 text-sm font-medium'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
        <div className='w-2/5 px-3'>
          <OrderSummary />
        </div>
      </div>
      <button className='border-2 w-full p-4 text-center inline-flex justify-center items-center '>
        Checkout
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

export default Review;
