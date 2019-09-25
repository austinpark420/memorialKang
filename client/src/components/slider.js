import React, { useState } from 'react';
import Slider from 'react-slick';
import 'css/common.scss';
import 'css/slider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
  const [settings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  return (
    <Slider {...settings}>
      <div>
        <img src={require('../images/main.jpg')} alt='main' />
      </div>
      <div>
        <img src={require('../images/main.jpg')} alt='main' />
      </div>
      <div>
        <img src={require('../images/main.jpg')} alt='main' />
      </div>
    </Slider>
  );
};

export default BannerSlider;
