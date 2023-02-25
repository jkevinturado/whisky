import { useState, useEffect } from 'react';

import Header from '../components/Header/index';
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
  // const [products, setProducts] = useState([]);

  const { products } = props;

  // useEffect(() => {
  //   const getProductData = async () => {
  //     const data = await GetFirebaseProductsDB();
  //     console.log(data);
  //     const products = await Promise.all(
  //       data.map(async (product) => ({
  //         ...product,
  //         createdAt: convertTimestamp(product.createdAt),
  //         thumbnailfile: await getImageFireStorage(product.thumbnailfile),
  //       }))
  //     );
  //     console.log(products);
  //     setProducts(products);
  //   };
  //   getProductData();
  // }, []);

  return (
    <>
      <Header />
      <section className='flex h-max w-full p-8 bg-slate-300'>
        {/* <Slider> */}
        {products.map((product) => {
          return <ProductCard2 key={product.id} data={product} />;
        })}
        {/* </Slider> */}
      </section>
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
