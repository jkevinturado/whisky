import { Menu, Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '../../../store/userContext';
import { useDialog } from '../../../store/dialogContext';
import {
  GetFirebaseProductsById,
  getImageFireStorage,
  getProductDetails,
} from '../../../utils/firebase';
import { currencyFormatter } from '../../../utils/format';

const Header = () => {
  const { toggleDrawer } = useDialog();
  const {
    user,
    cart,
    wishlistItemCount,
    cartItemCount,
    logout,
    removeCartItem,
    updateCartItem,
  } = useAuth();
  const [cartproducts, setCartproducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  // console.log(cart);

  useEffect(() => {
    const cartproductdetails = async () => {
      let data = await getProductDetails(cart);
      setCartproducts(data.productdetails);
      setSubTotal(data.getSubTotal);
    };

    if (cart) {
      cartproductdetails();
    }
  }, [cart]);

  const handleClickCartIcon = () => setOpenCart(!openCart);

  return (
    <>
      <header className='header sticky top-0 left-0 mb-2'>
        <div className='hidden md:flex justify-between items-center p-5 w-full'>
          <div className='logo-header w-1/3 flex justify-center'>
            <Link href='/' className='text-bold text-3xl text-black'>
              Whisky
            </Link>
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
          <div className='user-profile-menu w-1/3 flex justify-evenly items-center space-x-4'>
            <div className='flex justify-evenly items-center space-x-4'>
              <div
                onClick={toggleDrawer}
                className='wishlist-icon font-sans inline-block text-black hover:text-gray-700'
              >
                <a href='#' className='relative' role='buton'>
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
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                    />
                  </svg>
                  <span className='absolute left-0 bottom-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center'>
                    {wishlistItemCount}
                  </span>
                </a>
              </div>
              <Menu
                as='div'
                className='cart-icon relative inline-block font-sans text-black hover:text-gray-700'
              >
                <Menu.Button
                  as='a'
                  onClick={handleClickCartIcon}
                  className='flex justify-center items-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8 bg-transparent'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <span className='absolute left-0 bottom-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center'>
                    {cartItemCount}
                  </span>
                  <div className='text-sm italic'>
                    {currencyFormatter.format(subTotal)}
                  </div>
                </Menu.Button>
                <Transition
                  show={openCart}
                  enter='transition duration-100 ease-out'
                  enterFrom='transform scale-95 opacity-0'
                  enterTo='transform scale-100 opacity-100'
                  leave='transition duration-75 ease-out'
                  leaveFrom='transform scale-100 opacity-100'
                  leaveTo='transform scale-95 opacity-0'
                >
                  <Menu.Items
                    onMouseLeave={handleClickCartIcon}
                    as='ul'
                    className='absolute mt-2 w-80 rounded-md shadow-lg bg-slate-100 overflow-y-scroll'
                  >
                    {cartproducts.length === 0 && (
                      <div className='flex justify-center items-center text-md italic p-8'>
                        Your cart is empty
                      </div>
                    )}
                    {cartproducts.length > 0 &&
                      cartproducts.map(
                        ({
                          productid,
                          quantity,
                          productdetails: {
                            name,
                            price,
                            thumbnailfile,
                            stocks,
                          },
                        }) => (
                          <Menu.Item
                            as='li'
                            key={productid}
                            className='flex px-4 items-center text-xs font-light my-5  space-x-2'
                          >
                            <div className='flex w-3/12 h-14 object-fill border-2 border-gray-200'>
                              <Image
                                src={thumbnailfile}
                                width={320}
                                height={320}
                                alt={name}
                              />
                            </div>
                            <div className='flex flex-col space-y-1 w-9/12'>
                              <div className='font-medium truncate'>{name}</div>
                              <div className='font-medium'>
                                {currencyFormatter.format(price)}
                              </div>
                              <div className='flex items-center'>
                                <div className='flex justify-start items-center w-6/12'>
                                  <div className='mr-2'>Qty: </div>
                                  <div className='flex justify-center items-center'>
                                    <button
                                      onClick={() =>
                                        updateCartItem(productid, 1)
                                      }
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
                                      onClick={() =>
                                        updateCartItem(productid, -1)
                                      }
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
                                    className='text-emerald-500 font-medium'
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Menu.Item>
                        )
                      )}
                    {cartproducts.length > 0 && (
                      <Menu.Item
                        as='div'
                        className='bottom-0 px-2 bg-white left-0 h-auto text-xs overflow-hidden shadow-md'
                      >
                        <div className='p-2 my-2 '>
                          <div className='flex justify-between items-center'>
                            <div className='text-sm font-medium mb-2'>
                              Subtotal:
                            </div>
                            <div className='text-sm font-medium mb-2'>
                              {currencyFormatter.format(subTotal)}
                            </div>
                          </div>
                          <button className='w-full p-1  text-sm font-medium border-2 rounded-md overflow-hidden shadow-md border-emerald-400 hover:bg-emerald-500 hover:text-white'>
                            Checkout
                          </button>
                          <div className='w-full p-1 mt-2 text-center text-sm font-medium border-2 rounded-md overflow-hidden shadow-md border-emerald-400 hover:bg-emerald-500 hover:text-white'>
                            <Link href='/user/shopping-cart'>View Cart</Link>
                          </div>
                        </div>
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {!user && (
              <Link
                href='/auth/login'
                className='login-btn w-1/6  hover:bg-emerald-200 hover:text-white text-md text-emerald-400 text-center'
              >
                Sign in
              </Link>
            )}
            {user && (
              <button
                onClick={logout}
                className='login-btn btn-primary w-24  hover:bg-emerald-200 hover:text-white hover:border-none text-md text-emerald-400 border-emerald-400'
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
