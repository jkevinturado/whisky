import React from 'react';
import Head from 'next/head';
import ProductCard2 from '../../components/Card/ProductCard2';
import {
  GetFirebaseProductsDB,
  getImageFireStorage,
} from '../../utils/firebase';

function convertTimestamp(timestamp) {
  let date = timestamp.toDate();
  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  return date;
}

const index = (props) => {
  const { products } = props;
  return (
    <>
      <Head>
        <title>Project Whisky | Products</title>
        <meta
          name='description'
          value='A ecommerce selling Pc components/parts, laptops, peripheral, etc. Built in NextJs/React, Tailwindcss, firebase'
        />
      </Head>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 py-4 bg-slate-200'>
        {products.map((product) => {
          return <ProductCard2 key={product.id} data={product} />;
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
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
}

export default index;
