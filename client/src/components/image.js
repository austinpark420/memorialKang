import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import Slider from 'react-slick';

import { loadImage, editImage, removeImage } from '../actions/images';

import styles from '../css/image.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Image = ({
  match: { url },
  isAuthenticated,
  detailImages: { _id, title, category, images },
  loadImage,
  removeImage,
  editImage
}) => {
  useEffect(() => {
    loadImage(url);
  }, [loadImage, url]);

  const path = url.split('/')[1];

  const [redirectToImages, setRedirectToImages] = useState(false);

  const [settings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  const handleClickRemove = async () => {
    if (window.confirm('선택한 이미지를 삭제하시겠습니까?')) {
      removeImage(url);
      setRedirectToImages(true);
    } else {
      return;
    }
  };

  // react-modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    let imageForm = document.getElementById(`${styles.imageForm}`);
    let formData = new FormData(imageForm);

    editImage(url, formData);
    closeModal();
  };

  if (redirectToImages) {
    return <Redirect to={`/${path}`}></Redirect>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
        >
          <button className={styles.close} onClick={closeModal}>
            x
          </button>
          <form
            id={styles.imageForm}
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className={styles.radio}>
              <label htmlFor='category'>
                <span>강경대열사</span>
                <input
                  name='category'
                  value='alive'
                  type='radio'
                  required
                  defaultChecked={category === 'alive' ? 'checked' : ''}
                />
              </label>
              <label htmlFor='category'>
                <span>91년도 5월투쟁</span>
                <input
                  name='category'
                  value='moment'
                  type='radio'
                  required
                  defaultChecked={category === 'moment' ? 'checked' : ''}
                />
              </label>
              <label htmlFor='category'>
                <span>추모사업회 활동</span>
                <input
                  name='category'
                  value='activity'
                  type='radio'
                  required
                  defaultChecked={category === 'activity' ? 'checked' : ''}
                />
              </label>
            </div>
            <label htmlFor='title'>제목</label>
            <input
              type='text'
              className={styles.title}
              name='title'
              id='title'
              defaultValue={title}
            />

            <label htmlFor='images'>이미지</label>
            <input
              type='file'
              className={styles.images}
              name='images'
              id='images'
              multiple
            />
            <input type='submit' value='등록' />
          </form>
        </Modal>

        <Slider {...settings}>
          {images &&
            images.map(image => (
              <li>
                <img src={image} alt={image} />
              </li>
            ))}
        </Slider>

        <button className={styles.list}>
          <Link to={`/${path}`}>목록</Link>
        </button>

        {isAuthenticated && (
          <Fragment>
            <button onClick={openModal} className={styles.edit}>
              수정
            </button>
            <button onClick={handleClickRemove} className={styles.remove}>
              삭제
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

let mapStateToProps = state => ({
  detailImages: state.images.detailImages,
  isAuthenticated: state.auth.isAuthenticated
});

Image.propTypes = {
  detailImages: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadImage: PropTypes.func.isRequired,
  editImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loadImage, editImage, removeImage })(
  Image
);
