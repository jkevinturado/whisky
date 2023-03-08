import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCartPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { currencyFormatter } from '../../utils/format';

const ProductCard = ({ data }) => {
  const {
    imageUrl,
    ProductName,
    ProductCategory,
    ProductPrice,
    ProductRating,
  } = data;
  const maxStar = 5;

  const StarFillIcon = () => {
    return <FontAwesomeIcon icon={faStar} style={{ color: '#10b981' }} />;
  };
  const StarNoFillIcon = () => {
    return <FontAwesomeIcon inv icon={faStar} style={{ color: '#cbd5e1' }} />;
  };

  return (
    <>
      <div className='card-container w-1/5 m-2  justify-center items-center border-2 border-gray-300 shadow-md rounded-md overflow-hidden  hover:shadow-xl transition ease-in duration-100 cursor-pointer'>
        <div className='card-content'>
          <div className='card-image'>
            <Image
              width={192}
              height={192}
              src={imageUrl}
              alt={ProductName}
              sizes='100%'
              className='w-full object-cover'
            />
          </div>
          <div className='card-details m-4 '>
            <div className='card-title'>
              <div className='product-category text-xs'>{ProductCategory}</div>
              <div className='product-name mb-1'>
                <p className='truncate text-sm text-gray-500'>{ProductName}</p>
              </div>
            </div>
            <div className='product-rating flex justify-start items-center text-xs  italic'>
              <ul className='flex items-center mr-2'>
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
              </ul>
              ({ProductRating})
            </div>
            <div className='product-price text-sm font-medium mt-3'>
              {currencyFormatter.format(price)}
            </div>
          </div>
        </div>
        <div className='card-footer flex h-10 justify-evenly items-center border-t-2 border-gray-200 text-lg text-center text-emerald-500'>
          <div className='add-to-favorites w-1/2 h-full flex items-center justify-center border-r-2 hover:text-gray-200 hover:bg-emerald-500 hover:border-emerald-500'>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div className='add-to-cart w-1/2 h-full flex items-center justify-center hover:text-gray-200 hover:bg-emerald-500 hover:border-emerald-500'>
            <FontAwesomeIcon icon={faCartPlus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
