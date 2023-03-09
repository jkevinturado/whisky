import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '../../store/userContext';
import { useDialog } from '../../store/dialogContext';
import { getProductDetails } from '../../utils/firebase';
import { currencyFormatter } from '../../utils/format';

const WishlistDrawer = () => {
  const { showDrawer, toggleDrawer } = useDialog();
  const {
    wishlist,
    wishlistItemCount,
    updateCartItem,
    resetWishlist,
    removeWishlistItem,
  } = useAuth();
  const [wishlistproduct, setWishlistproduct] = useState([]);

  useEffect(() => {
    const wishlistproductdetails = async () => {
      let data = await getProductDetails(wishlist);
      setWishlistproduct(data.productdetails);
    };

    if (wishlist) {
      wishlistproductdetails();
    }
  }, [wishlist]);

  const handleCloseDrawer = (e) => {
    if (e.target.id === 'backdrop') toggleDrawer();
  };

  const handleAddtoCart = async (id) => {
    await updateCartItem(id, 1);
    await removeWishlistItem(id);
  };

  if (!showDrawer) return null;
  return (
    <div
      id='backdrop'
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-y-scroll'
      onClick={(e) => handleCloseDrawer(e)}
    >
      <div className='fixed top-0 right-0 z-40 flex justify-center items-center'>
        <div className=' h-screen bg-white' style={{ width: '36vw' }}>
          <div className='flex flex-col justify-evenly p-2'>
            <div className='header flex justify-between items-center border-b-2 border-gray-200 mb-3'>
              <div className='text-xl font-medium '>Wishlist</div>
              <button onClick={toggleDrawer}>
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='wishlist-items '>
              {wishlistproduct.length > 0 && (
                <ul className='w-auto rounded-md border overflow-hidden shadow-lg p-1'>
                  {wishlistproduct.map(
                    ({
                      productid,
                      productdetails: { name, price, thumbnailfile, stocks },
                    }) => (
                      <li
                        key={productid}
                        className='flex items-center text-xs font-light space-x-2'
                      >
                        <div className='flex w-3/12 h-24 object-fill '>
                          <Image
                            src={thumbnailfile}
                            width={540}
                            height={540}
                            alt={name}
                          />
                        </div>
                        <div className='flex flex-col space-y-1 w-9/12 p-2'>
                          <div className='font-medium truncate'>{name}</div>
                          <div className='font-medium'>
                            {currencyFormatter.format(price)}
                          </div>

                          <div className='flex justify-evenly items-center space-x-2'>
                            <button
                              onClick={() => handleAddtoCart(productid, name)}
                              className='font-medium w-full p-1 border text-emerald-500'
                            >
                              Add to bag
                            </button>
                            <button
                              onClick={() => removeWishlistItem(productid)}
                              className='font-medium w-full p-1 border text-emerald-500'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
            <div className='absolute w-full bottom-0 right-0 border-t border-gray-300 bg-gray-50 overflow-hidden shadow-md'>
              <div className='flex w-full flex-col justify-center items-center space-y-2 p-2'>
                <button
                  onClick={resetWishlist}
                  className='w-full p-1 text-sm font-medium border-2 rounded-sm overflow-hidden shadow-md border-emerald-400 hover:bg-emerald-500 hover:text-white'
                >
                  Reset Wishlist
                </button>
                <button className='w-full p-1 text-center text-sm font-medium border-2 rounded-sm overflow-hidden shadow-md border-emerald-400 hover:bg-emerald-500 hover:text-white'>
                  <Link href='/user/wishlist'>View wishlist</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
