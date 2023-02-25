import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../Card/ProductCard';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faArrowAltCircleLeft,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function SimpleSlider({ children }) {
  const nextArrowClass =
    'block absolute z-10 -right-4  w-7 h-7 top-1/2 text-3xl text-emerald-500 cursor-pointer';
  const prevArrowClass =
    'block absolute z-10 -left-3  w-32 h-32 top-1/2 text-3xl text-emerald-500 cursor-pointer';
  const CustomPrevArrowIcon = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className={prevArrowClass} style={{ ...style }}>
        <FontAwesomeIcon icon={faArrowCircleLeft} className='bg-white' />
      </div>
    );
  };
  const CustomNextArrowIcon = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className={nextArrowClass} style={{ ...style }}>
        <FontAwesomeIcon icon={faArrowCircleRight} className='bg-white' />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrowIcon />,
    nextArrow: <CustomNextArrowIcon />,
  };

  return (
    <div className='block w-4/5 mx-auto'>
      <h2> New Product</h2>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
