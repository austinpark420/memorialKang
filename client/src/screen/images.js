import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Icon } from 'antd';
import Modal from 'react-modal';

import $ from 'jquery';

import { loadImages, addImage } from '../actions/images';

import 'css/images.scss';

Modal.setAppElement('#root');

const Images = ({
  match: { url },
  allImages,
  loadImages,
  isAuthenticated,
  addImage
}) => {
  const path = url.split('/')[1];

  // filter image
  const aliveImages = allImages.filter(image => image.category === 'alive');
  const momentImages = allImages.filter(image => image.category === 'moment');
  const activityImages = allImages.filter(
    image => image.category === 'activity'
  );

  useEffect(() => {
    loadImages(path);
  }, [loadImages, path]);

  // menu tab
  useEffect(() => {
    $('.tab').on('click', function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');

      $('.image-list').removeClass('active-image');
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass('active-image');
    });
  }, []);

  // react-modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // react-modal form
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    images: []
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    let imageForm = document.getElementById('image_form');
    let formData = new FormData(imageForm);

    addImage(path, formData);
    closeModal();
  };

  return (
    <div className='images-wrap'>
      <ul className='heading'>
        <li className='tab active' rel='alive' tabIndex='0'>
          <h2>강경대 생전사진</h2>
        </li>
        <li className='tab' rel='moment' tabIndex='1'>
          <h2>91년도 당시사진</h2>
        </li>
        <li className='tab' rel='activity' tabIndex='2'>
          <h2>추모사업회 활동사진</h2>
        </li>
      </ul>

      {isAuthenticated && (
        <button className='add' onClick={openModal}>
          <Icon className='plus' type='plus-circle' />
        </button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal'>
        <button className='close' onClick={closeModal}>
          <Icon type='close' />
        </button>
        <form
          id='image_form'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div className='radio'>
            <label htmlFor='category'>
              강경대열사
              <input
                name='category'
                value='alive'
                onChange={handleChange}
                type='radio'
              />
            </label>
            <label htmlFor='category'>
              91년도 5월투쟁
              <input
                name='category'
                value='moment'
                onChange={handleChange}
                type='radio'
              />
            </label>
            <label htmlFor='category'>
              추모사업회 활동
              <input
                name='category'
                value='activity'
                onChange={handleChange}
                type='radio'
              />
            </label>
          </div>
          <label htmlFor='title'>제목</label>
          <input
            type='text'
            className='title'
            name='title'
            id='title'
            onChange={handleChange}
          />

          <label htmlFor='images'>이미지</label>
          <input
            type='file'
            className='images'
            name='images'
            id='images'
            onChange={handleChange}
            multiple
          />
          <input type='submit' value='이미지 업로드' />
        </form>
      </Modal>

      <section>
        <ul className='image-list alive active-image'>
          {allImages &&
            aliveImages.map(image => (
              <Fragment>
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className='img-wraper'>
                      <div className='img-center'>
                        <img src={image.images[0]} alt='' />
                      </div>
                    </div>
                    <span>
                      <b>글쓴이</b>
                      {image.writer}
                    </span>
                    <span>
                      <b>날짜</b>
                      {image.date}
                    </span>
                  </li>
                </Link>
              </Fragment>
            ))}
        </ul>
        <ul className='image-list moment'>
          {allImages &&
            momentImages.map(image => (
              <Fragment>
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className='img-wraper'>
                      <div className='img-center'>
                        <img src={image.images[0]} alt='' />
                      </div>
                    </div>
                    <span>
                      <b>글쓴이</b>
                      {image.writer}
                    </span>
                    <span>
                      <b>날짜</b>
                      {image.date}
                    </span>
                  </li>
                </Link>
              </Fragment>
            ))}
        </ul>
        <ul className='image-list activity'>
          {allImages &&
            activityImages.map(image => (
              <Fragment>
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className='img-wraper'>
                      <div className='img-center'>
                        <img src={image.images[0]} alt='' />
                      </div>
                    </div>
                    <span>
                      <b>글쓴이</b>
                      {image.writer}
                    </span>
                    <span>
                      <b>날짜</b>
                      {image.date}
                    </span>
                  </li>
                </Link>
              </Fragment>
            ))}
        </ul>
      </section>

      <Route path={`${url}/:id`} component={Image} />
    </div>
  );
};

let mapStateToProps = state => ({
  allImages: state.images.allImages,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    loadImages,
    addImage
  }
)(Images);
