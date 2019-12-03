import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import Slider from 'react-slick';

import {
  loadMemorialHistory,
  editMemorialHistory,
  removeMemorialHistory
} from '../actions/memorialHistories';

import styles from '../css/memorialHistory.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MemorialHistory = ({
  match: { url },
  isAuthenticated,
  detailImages: { images, _id },
  loadMemorialHistory,
  editMemorialHistory,
  removeMemorialHistory
}) => {
  useEffect(() => {
    loadMemorialHistory(url);
  }, [loadMemorialHistory, url]);

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
    if (window.confirm('선택한 기조를 삭제하시겠습니까?')) {
      await removeMemorialHistory(url);
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

    let memorialHistoryForm = document.getElementById(
      `${styles.memorialHistoryForm}`
    );
    let formData = new FormData(memorialHistoryForm);

    editMemorialHistory(path, formData);
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
            id={styles.memorialHistoryForm}
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <label htmlFor='_id'>고유번호</label>
            <input id='_id' name='_id' type='text' defaultValue={_id} />
            <label htmlFor='title'>기조</label>
            <input
              type='text'
              className={styles.title}
              name='title'
              id='title'
              required
            />
            <label htmlFor='images'>이미지</label>
            <input
              type='file'
              className={styles.images}
              name='images'
              id='images'
              multiple
              required
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
  detailImages: state.memorialHistories.detailImages,
  isAuthenticated: state.auth.isAuthenticated
});

MemorialHistory.propTypes = {
  detailImages: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadMemorialHistory: PropTypes.func.isRequired,
  editMemorialHistory: PropTypes.func.isRequired,
  removeMemorialHistory: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  loadMemorialHistory,
  editMemorialHistory,
  removeMemorialHistory
})(MemorialHistory);
