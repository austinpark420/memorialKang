import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Slider from 'react-slick';

import { loadImage, removeImage } from 'actions/images';

import 'css/common.scss';
import 'css/image.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Image = ({
  match: { url },
  isAuthenticated,
  loadImage,
  detailImages,
  removeImage
}) => {
  useEffect(() => {
    loadImage(url);
  }, [loadImage, url]);

  const path = url.split('/')[1];

  const [settings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  const handleClickRemove = () => {
    removeImage(url);
  };

  return (
    <div className='image-wrap'>
      <Slider {...settings}>
        {detailImages &&
          detailImages.map(detailImage => (
            <li>
              <img src={detailImage} alt='' />
            </li>
          ))}
      </Slider>

      <button className='list'>
        <Link to={`/${path}`}>목록</Link>
      </button>

      {isAuthenticated && (
        <Fragment>
          {/* <button onClick={handleClickEdit} className='edit'>
            <Link to={`/${path}/reWrite`}>수정</Link>
          </button> */}
          <button onClick={handleClickRemove} className='remove'>
            삭제
          </button>
        </Fragment>
      )}
    </div>
  );
};

let mapStateToProps = state => ({
  detailImages: state.images.detailImages.images,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadImage, removeImage }
)(Image);
