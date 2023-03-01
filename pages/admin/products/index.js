import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Header from '../../../components/Layout/Header/Header2';
import NewProduct from '../../../components/Form/Product/NewProduct';
import {
  GetFirebaseProductsDB,
  getImageFireStorage,
} from '../../../utils/firebase';

import { DialogContext } from '../../../store/dialogContext';

const tableHeader = [
  { key: 'Product', title: 'Product' },
  { key: 'category', title: 'Category' },
  { key: 'brand', title: 'Brand' },
  { key: 'qty', title: 'Qty' },
  { key: 'price', title: 'Price' },
  { key: 'action', title: 'Action' },
];

export default function AdminProductPage() {
  const { showModal } = useContext(DialogContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const data = await GetFirebaseProductsDB();
      const products = await Promise.all(
        data.map(async (product) => ({
          ...product,
          thumbnailfile: await getImageFireStorage(product.thumbnailfile),
        }))
      );
      setProducts(products);
    };
    getProductData();
  }, []);

  const openModal = () => {
    showModal({ title: 'Add Product', content: <NewProduct /> });
  };

  return (
    <div>
      <section className='product_header flex flex-col w-full h-max p-8 justify-center items-center'>
        <div className='flex w-9/12 justify-between item-center'>
          <div className='w-/12'>
            <h1 className='text-md font-bold'>Products</h1>
          </div>
          <div className='w-1/2'>
            <button className='form-button-primary' onClick={openModal}>
              Add Product
            </button>
          </div>
        </div>
        <div className='product_toolbar flex w-9/12 justify-between items-center'>
          <div className='w-2/5'>
            <input
              type='text'
              name='search_product'
              id='search_product'
              className='form-textbox'
              placeholder='Search'
            />
          </div>
          <div className='flex w-3/5 justify-center items-center'>
            <select
              name='product_category'
              id='product_category'
              className='form-textbox'
            >
              <option value='all' key='all'>
                Choose Category
              </option>
            </select>
            <select
              name='product_brand'
              id='product_brand'
              className='form-textbox'
            >
              <option value='all' key='all'>
                Choose Brand
              </option>
            </select>
            <select name='sortby' id='sortby' className='form-textbox'>
              <option value='date' key='date'>
                Sort by
              </option>
            </select>
          </div>
        </div>
        <div className='product-table flex justify-center items-center w-9/12'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3' key='img'>
                  <span className='sr-only'>Image</span>
                </th>
                {tableHeader.map(({ key, title }) => {
                  return (
                    <th scope='col' className='px-6 py-3' key={key}>
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {products.map(
                ({
                  id,
                  name,
                  description,
                  brand,
                  thumbnailfile,
                  category,
                  price,
                  quantity,
                }) => {
                  return (
                    <tr
                      key={id}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                    >
                      <td className='w-32 p-4'>
                        <Image
                          src={thumbnailfile}
                          alt='Apple Watch'
                          width={192}
                          height={192}
                        />
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                        {name}
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                        {category}
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                        {brand}
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-3'>
                          <button
                            className='inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                            type='button'
                          >
                            <span className='sr-only'>Quantity button</span>
                            <svg
                              className='w-4 h-4'
                              aria-hidden='true'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fillRule='evenodd'
                                d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                          </button>
                          <div>
                            <input
                              type='number'
                              id='first_product'
                              className='bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              placeholder='1'
                              required
                              value={quantity}
                            />
                          </div>
                          <button
                            className='inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                            type='button'
                          >
                            <span className='sr-only'>Quantity button</span>
                            <svg
                              className='w-4 h-4'
                              aria-hidden='true'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                        {price}
                      </td>
                      <td className='px-6 py-4'>
                        <a
                          href='#'
                          className='font-medium text-red-600 dark:text-red-500 hover:underline'
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
