import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCartPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../store/userContext';
import {
  GetFirebaseProductsById,
  getImageFireStorage,
} from '../../utils/firebase';

const ProductDetails = (props) => {
  const { product } = props;
  const { cart, addToCart, toggleWishlist, wishlist } = useAuth();

  const { name, id, price, thumbnailfile, brand, description } = product[0];

  const isWishlist = wishlist.findIndex(({ productid }) => {
    return productid === id;
  });

  return (
    <section className='block md:flex md:justify-center md:items-center min-w-fit bg-white lg:py-6 '>
      <div className='md:flex md:w-11/12 lg:w-9/12 md:justify-center md:items-start md:space-x-4'>
        <div className='product-image-wrapper md:w-1/2'>
          {/* <div className='product-brand text-sm text-gray-400 font-light'>
            {category}
          </div> */}
          <div className='product-image border border-slate-200 rounded-md overflow-hidden'>
            <Image
              width={640}
              height={800}
              sizes='100%'
              src={thumbnailfile}
              alt={name}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='px-2 py-4 md:py-0 product-details-wrapper md:w-1/2 flex flex-col space-y-2'>
          <div className='product-details flex flex-col space-y-2'>
            <div className='product-brand text-sm text-gray-400 font-light'>
              {brand}
            </div>
            <div className='product-name font-semibold text-black text-md'>
              {name}
            </div>
            <div className='product-description text-neutral-800 text-sm '>
              <span className='block font-medium text-md'>Description:</span>
              {description}
            </div>
            <div className='product-stocks text-sm'>
              Availability:
              <span className='text-emerald-500 ml-2'>In Stock</span>
            </div>
          </div>
          <div className='divider py-4'>
            <hr />
          </div>
          <div className='product-pricing flex flex-col'>
            <div className='font-medium text-black text-2xl'>₱ {price}</div>
          </div>
          <div className='product-buttons space-y-2 lg:flex lg:justify-start lg:items-center lg:space-x-2 lg:space-y-0'>
            <button
              onClick={() => addToCart(product[0])}
              className='btn-primary w-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
            >
              <FontAwesomeIcon icon={faCartPlus} className='mr-2' />
              Add to Cart
            </button>
            {isWishlist === -1 && (
              <button
                onClick={() => toggleWishlist(product[0])}
                className='btn-primary w-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
              >
                <FontAwesomeIcon icon={faThumbsUp} className='mr-2' />
                Add to Wishlist
              </button>
            )}
            {isWishlist >= 0 && (
              <button
                onClick={() => toggleWishlist(product[0])}
                className="btn-primary w-full flex justify-center items-center border-emerald-500 bg-emerald-500 text-white hover:bg-white hover:border-emerald-500 hover:text-gray-500 hover:content-['Remove to Wishlist']"
              >
                <FontAwesomeIcon icon={faThumbsUp} className='mr-2' />
                <div className=''>Added to Wishlist</div>
              </button>
            )}
          </div>
          <div className='flex justify-center items-center '>
            <button className='btn-primary p-4 w-full overflow-hidden hover:bg-emerald-500 hover:text-white hover:border-emerald-500 '>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function convertTimestamp(timestamp) {
  let date = timestamp.toDate();
  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  return date;
}

export const getServerSideProps = async (context) => {
  const { params } = context;

  const productid = params.id;
  const data = [await GetFirebaseProductsById(productid)];

  if (!data) return { notFound: true };
  const product = await Promise.all(
    data.map(async (product) => ({
      ...product,
      id: productid,
      createdAt: convertTimestamp(product.createdAt),
      thumbnailfile: await getImageFireStorage(product.thumbnailfile),
    }))
  );

  return {
    props: {
      product,
    },
  };
};

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: { id: 'Zm5egDVbxSFDESoMXZvD' },
//       },
//     ],
//     fallback: 'blocking',
//   };
// };

export default ProductDetails;
