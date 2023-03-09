import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCartPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../store/userContext';
import { currencyFormatter } from '../../utils/format';

const ProductCard2 = ({ data }) => {
  const router = useRouter();
  const { updateCartItem, toggleWishlist, wishlist } = useAuth();
  const { id, thumbnailfile, name, category, price } = data;
  const maxStar = 5;
  const isWishlist = wishlist
    ? wishlist.findIndex(({ productid }) => {
        return productid === id;
      })
    : -1;

  const StarFillIcon = () => {
    return <FontAwesomeIcon icon={faStar} style={{ color: '#10b981' }} />;
  };
  const StarNoFillIcon = () => {
    return <FontAwesomeIcon inv icon={faStar} style={{ color: '#cbd5e1' }} />;
  };

  const handleClickProductDetails = (e, id) => {
    console.log(e);
    if (e.target.id === 'product-container') {
      console.log(e.target.id);
      router.push({
        pathname: '/products/[id]',
        query: { id },
      });
    }
  };

  return (
    <>
      <div
        id='product-container'
        onClick={(e) => handleClickProductDetails(e, id)}
        className='card-container w-52 h-full m-2 justify-center items-center bg-white border-2 border-gray-300 shadow-md rounded-md overflow-hidden  hover:shadow-xl hover:bg-blend-overlay transition ease-in duration-100 cursor-pointer '
      >
        <div className='card-content'>
          <div className='card-image h-full w-full'>
            <Image
              width={640}
              height={640}
              sizes='100%'
              // fill
              // sizes='(max-width: 768px) 100vw,
              // (max-width: 1200px) 100%,
              // 33vw'
              src={thumbnailfile}
              alt={name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='card-details m-4'>
            <div className='card-title'>
              <div className='product-category text-xs mb-2'>{category}</div>
              <div className='product-name'>
                <p className='truncate text-sm text-gray-600 font-medium'>
                  {name}
                </p>
              </div>
            </div>
            <div className='product-rating flex justify-start items-center text-xs  italic'>
              {/* <ul className='flex items-center mr-2'>
                {[...new Array(maxStar)].map((arr, index) => {
                  return index < ProductRating ? (
                    <li>
                      <StarFillIcon />
                    </li>
                  ) : (
                    <li>
                      <StarNoFillIcon />
                    </li>
                  );
                })}
              </ul> */}
              (4.5)
            </div>
          </div>
          {/* end card details */}
        </div>
        {/* end card-content */}

        <div className='card-footer flex m-4 items-center text-emerald-500'>
          <div className='product-price w-1/2 text-sm font-medium text-black'>
            {currencyFormatter.format(price)}
          </div>
          <div className='card-buttons flex justify-evenly items-center w-1/2 h-8'>
            {isWishlist === -1 && (
              <button
                onClick={() => toggleWishlist(data)}
                className='w-10 h-10 rounded-full border-2 border-gray-500 hover:bg-emerald-500 hover:text-white hover:border-0 text-gray-500 transition ease-in duration-200'
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            )}
            {isWishlist >= 0 && (
              <button
                onClick={() => toggleWishlist(data)}
                className='w-10 h-10 rounded-full  bg-emerald-500 text-white border-0 hover:text-gray-500 hover:border-2 hover:bg-white border-gray-500 transition ease-in duration-200'
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            )}

            <button
              onClick={() => updateCartItem(id, 1)}
              className='w-10 h-10 center rounded-full border-2 border-gray-500 hover:bg-emerald-500 hover:text-white hover:border-0 text-gray-500 transition ease-in duration-200'
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
        {/* end card footer */}
      </div>
      {/* end card container */}
    </>
  );
};

export default ProductCard2;
