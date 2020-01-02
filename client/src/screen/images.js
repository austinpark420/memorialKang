import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import Modal from 'react-modal';

import $ from 'jquery';

import { loadImages, addImage } from '../actions/images';

import styles from '../css/images.module.scss';

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
    $(`.${styles.tab}`).on('click', function() {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.imageList').removeClass(`${styles.activeImage}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeImage}`);
    });
  });

  // react-modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // react-modal form

  const handleSubmit = event => {
    event.preventDefault();

    let imageForm = document.getElementById(`${styles.imageForm}`);
    let formData = new FormData(imageForm);

    addImage(path, formData);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <ul className={styles.heading}>
          <li
            className={`${styles.tab} ${styles.active}`}
            rel='alive'
            tabIndex='0'
          >
            <h2>강경대 생전사진</h2>
          </li>
          <li className={styles.tab} rel='moment' tabIndex='1'>
            <h2>91년도 당시사진</h2>
          </li>
          <li className={styles.tab} rel='activity' tabIndex='2'>
            <h2>추모사업회 활동사진</h2>
          </li>
        </ul>

        {isAuthenticated && (
          <button className={styles.add} onClick={openModal}>
            이미지 업로드
          </button>
        )}

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
                <span>강경대 생전사진</span>
                <input name='category' value='alive' type='radio' required />
              </label>
              <label htmlFor='category'>
                <span>91년도 당시사진</span>
                <input name='category' value='moment' type='radio' required />
              </label>
              <label htmlFor='category'>
                <span>추모사업회 활동사진</span>
                <input name='category' value='activity' type='radio' />
              </label>
            </div>
            <label htmlFor='title'>제목</label>
            <input
              type='text'
              className={styles.title}
              name='title'
              id='title'
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

        <section>
          <ul className={`imageList alive ${styles.activeImage}`}>
            {allImages &&
              aliveImages.map(image => (
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className={styles.imgWraper}>
                      <div className={styles.imgCenter}>
                        <img src={image.images[0]} alt={image.keys[0]} />
                      </div>
                      <p>{image.keys.length}</p>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
          <ul className={`imageList moment`}>
            {allImages &&
              momentImages.map(image => (
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className={styles.imgWraper}>
                      <div className={styles.imgCenter}>
                        <img src={image.images[0]} alt={image.keys[0]} />
                      </div>
                      <p>{image.keys.length}</p>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
          <ul className={`imageList activity`}>
            {allImages &&
              activityImages.map(image => (
                <Link to={`${url}/${image._id}`}>
                  <li>
                    <div className={styles.imgWraper}>
                      <div className={styles.imgCenter}>
                        <img src={image.images[0]} alt={image.keys[0]} />
                      </div>
                      <p>{image.keys.length}</p>
                    </div>
                    <p>{image.title}</p>
                  </li>
                </Link>
              ))}
          </ul>
        </section>

        <Route path={`${url}/:id`} component={Image} />
      </div>
    </div>
  );
};

let mapStateToProps = state => ({
  allImages: state.images.allImages,
  isAuthenticated: state.auth.isAuthenticated
});

Images.propTypes = {
  allImages: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadImages: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  loadImages,
  addImage
})(Images);
