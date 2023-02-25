import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  GetFirebaseProductsById,
  getImageFireStorage,
} from '../../utils/firebase';

const ProductDetails = (props) => {
  const { product } = props;
  //   const [product, setProduct] = useState(null);
  //   const router = useRouter();
  //   const { id } = router.query;
  //   console.log(id);

  //   useEffect(() => {
  //     const getProductData = async () => {
  //       if (!id) return;
  //       const data = await GetFirebaseProductsById(id);
  //       console.log(data);
  //       setProduct(data);
  //     };
  //     getProductData();
  //   }, [id]);

  const {
    name,
    id: productid,
    category,
    price,
    thumbnailfile,
    brand,
    description,
  } = product[0];

  return (
    <>
      <div>{productid}</div>
      <div>{category}</div>
      <div>{name}</div>
      <div>{category}</div>
      <div>{brand}</div>
      <div>{price}</div>
      <div>{description}</div>
    </>
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

export const getStaticProps = async (context) => {
  const { params } = context;

  const productid = params.id;
  const data = [await GetFirebaseProductsById(productid)];
  if (!data) return { notFound: true };
  const product = await Promise.all(
    data.map(async (product) => ({
      ...product,
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

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'Zm5egDVbxSFDESoMXZvD' },
      },
    ],
    fallback: 'blocking',
  };
};

export default ProductDetails;
