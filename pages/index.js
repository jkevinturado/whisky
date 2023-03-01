import { useState, useEffect } from 'react';

import ProductCard from '../components/Card/ProductCard';
import ProductCard2 from '../components/Card/ProductCard2';
// import FilterSideBar from '../components/FilterSideBar/index';
import Slider from '../components/Sliders/MultipleRow';
import LoginForm from '../components/Form/Auth/Login2';
import NewProduct from '../components/Form/Product/NewProduct';
import { GetFirebaseProductsDB, getImageFireStorage } from '../utils/firebase';

function convertTimestamp(timestamp) {
  let date = timestamp.toDate();
  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  return date;
}

export default function Home(props) {
  const { products } = props;

  return (
    <>
      <div className='flex flex-col justify-center item-center w-full bg-gray-100 py-4'>
        <div>
          <h1 className='text-xl font-bold text-gray-800 text-center my-4'>
            New Arrivals
          </h1>
        </div>
        <div>
          <section className='grid grid-cols-2 gap-6 w-max md:flex md:w-full md:h-max md:justify-center md:items-center md:p-4 '>
            {/* <Slider> */}
            {products.map((product) => {
              return <ProductCard2 key={product.id} data={product} />;
            })}
            {/* </Slider> */}
          </section>
        </div>
      </div>
      {/* <div className='flex bg-slate-300 h-1/2'></div> */}
    </>
  );
}

export const getStaticProps = async () => {
  const data = await GetFirebaseProductsDB();
  const products = await Promise.all(
    data.map(async (product) => ({
      ...product,
      createdAt: convertTimestamp(product.createdAt),
      thumbnailfile: await getImageFireStorage(product.thumbnailfile),
      key: product.id,
    }))
  );

  if (!products) return { notFound: true };

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
