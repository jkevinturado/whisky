import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Datepicker from 'react-tailwindcss-datepicker';
import { FirebaseSaveProducttoDB, fileUpload } from '../../../utils/firebase';

import LoadingSpinner from '../../LoadingSpinner/';

const productSettings = {
  category: [
    { name: 'PC Components', title: 'PC Components' },
    { name: 'Laptops', title: 'Laptops' },
    { name: 'Peripherals', title: 'Peripherals' },
    { name: 'Net Devices', title: 'Net Devices' },
    { name: 'Accessories', title: 'Accessories' },
  ],
  components: [
    { name: 'PC Chassis', title: 'PC Chassis' },
    { name: 'Graphics Card', title: 'Graphics Card' },
    { name: 'LAN Card', title: 'LAN Card' },
    { name: 'Motherboard', title: 'Motherboard' },
    { name: 'Memory', title: 'Memory' },
    { name: 'Processor', title: 'Processor' },
    { name: 'Power Supply', title: 'Power Supply' },
    { name: 'Storage', title: 'Storage' },
    { name: 'Sound Card', title: 'Sound Card' },
  ],
  brands: [
    { name: 'Acer', title: 'Acer' },
    { name: 'Asus', title: 'Asus' },
    { name: 'AsRock', title: 'ASRock' },
    { name: 'AMD', title: 'AMD' },
    { name: 'Corsair', title: 'Corsair' },
    { name: 'Gigabyte', title: 'Gigabyte' },
    { name: 'HyperX', title: 'HyperX' },
    { name: 'Intel', title: 'Intel' },
    { name: 'Samsung', title: 'Samsung' },
    { name: 'Seagate', title: 'Seagate' },
    { name: 'SpecterPro', title: 'SpecterPro' },
    { name: 'TeamGroup', title: 'TeamGroup' },
    { name: 'Western Digital', title: 'Western Digital' },
  ],
};
// console.log(productSettings.category);

export default function NewProduct() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [thumbnailfile, setThumbnaiFile] = useState([]);
  const [gallery, setGallery] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState('');
  const [price, setprice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [publish, setIsPublish] = useState(false);
  const [publishdAt, setPublishAt] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [discountpercentage, setDiscountPercentage] = useState('');

  const OnPublishDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setPublishAt(newValue);
  };

  const handleSubmit = async () => {
    try {
      await fileUpload(`image/products`, thumbnailfile);
      let imageGallery = [];
      Array.from(gallery).map(async (file) => {
        await fileUpload(`image/products`, file);
        imageGallery.push(`image/products/${file.name}`);
      });

      const productdata = {
        name,
        description,
        brand,
        thumbnailfile: `image/products/${thumbnailfile.name}`,
        gallery: imageGallery,
        category,
        subcategory,
        price,
        quantity,
        publish,
        publishdAt,
        discounted,
        discountpercentage,
        createdAt: new Date(),
        updatedAt: '',
        status: true,
        archive: false,
      };
      await FirebaseSaveProducttoDB(productdata);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <section className='add-product flex justify-center items-center w-full h-screen bg-gray-200'>
    <div className='bg-white rounded-lg overflow-hidden p-6'>
      <form
        action={(e) => e.preventDefault()}
        onSubmit={handleSubmit}
        className='space-y-3'
      >
        <div className='w-full'>
          <label htmlFor='product_name' className='form-label'>
            Product Name
          </label>
          <input
            type='text'
            name='product_name'
            id='product_name'
            className='form-textbox'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <label htmlFor='product_description' className='form-label'>
            Description
          </label>
          <textarea
            rows={6}
            name='product_description'
            id='product_description'
            className='form-textbox'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='w-4/6 md:w-3/6'>
          <label htmlFor='product_brand' className='form-label '>
            Brand
          </label>
          <select
            id='product_brand'
            className='form-textbox'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option defaultValue={true}>Choose Brand</option>
            {productSettings.brands.map(({ name, title }) => {
              return (
                <option key={name} value={name}>
                  {title}
                </option>
              );
            })}
          </select>
        </div>
        <div className='w-full'>
          <label htmlFor='product_description' className='form-label'>
            Thumbnail
          </label>
          <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            type='file'
            // value={thumbnailfile.name}
            onChange={(e) => setThumbnaiFile(e.target.files[0])}
          />
        </div>
        <div className=''>
          <label htmlFor='product_img' className='form-label '>
            Gallery
          </label>
          <label htmlFor='product_img' className='form-image'>
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                aria-hidden='true'
                className='w-10 h-10 mb-3 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                PNG, JPG and (MAX. 800x400px)
              </p>
            </div>
            <input
              rows={4}
              type='file'
              name='product_img'
              id='product_img'
              className='hidden'
              multiple
              //   value={gallery}
              onChange={(e) => setGallery(e.target.files)}
            />
          </label>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          <div>
            <label htmlFor='product_category' className='form-label'>
              Category
            </label>
            <select
              id='product_category'
              className='form-textbox'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option defaultValue={true}>Choose Category</option>
              {productSettings.category.map(({ name, title }) => {
                return (
                  <option key={name} value={name}>
                    {title}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor='product_sub_category' className='form-label '>
              Sub Category
            </label>
            <select
              id='product_sub_category'
              className='form-textbox'
              value={subcategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option defaultValue={true}>Choose Sub Category</option>
              {productSettings.components.map(({ name, title }) => {
                return (
                  <option key={name} value={name}>
                    {title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='md:flex md:justify-start md:items-center space-x-3'>
          <div className=' w-3/6 md:w-2/6'>
            <label htmlFor='product_price' className='form-label'>
              Price
            </label>
            <input
              type='number'
              name='product_price'
              id='product_price'
              className='form-textbox'
              inputMode='number'
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <div className='w-3/6 md:w-2/6'>
            <label htmlFor='product_qty' className='form-label'>
              Quantity
            </label>
            <input
              type='number'
              name='product_qty'
              id='product_qty'
              className='form-textbox'
              inputMode='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className='md:flex md:justify-start md:items-center space-x-3'>
          <div className='flex just items-center w-3/6 md:w-2/12'>
            <label htmlFor='publish' className='form-label'>
              Publish
            </label>
            <input
              type='checkbox'
              name='publish'
              id='publish'
              className='ml-2 text-sm font-medium text-emerald-500'
              checked={publish}
              onChange={(e) => setIsPublish(!publish)}
            />
          </div>
          <div className='w-3/6 md:w-3/12'>
            <div>
              <Datepicker
                placeholder={'Choose Publish date'}
                asSingle={true}
                useRange={false}
                value={publishdAt}
                onChange={OnPublishDateChange}
              />
            </div>
          </div>
        </div>

        <div className='md:flex md:justify-start md:items-center space-x-3'>
          <div className='flex just items-center w-3/6 md:w-2/12'>
            <label htmlFor='publish' className='form-label'>
              Discount?
            </label>
            <input
              type='checkbox'
              name='discounted'
              onChange={() => setDiscounted(!discounted)}
              checked={discounted}
              id='discounted'
              className='ml-2 text-sm font-medium text-emerald-500'
            />
          </div>
          <div className='w-3/6 md:w-3/12'>
            <div className='flex'>
              <input
                type='number'
                inputMode='number'
                id='discountpercentage'
                name='discountpercentage'
                className=' form-txetbox rounded-none rounded-l-md flex-1 min-w-0 w-full text-sm border-gray-300  '
                placeholder='Enter discount percentage'
                value={discountpercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
              <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md '>
                %
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <button
            type='button'
            onClick={handleSubmit}
            className='form-button-primary'
          >
            Save
          </button>
        </div>
        <div className='col-span-2'>
          <button type='button' className='form-button-secondary'>
            Reset
          </button>
        </div>
      </form>
    </div>
    // </section>
  );
}
