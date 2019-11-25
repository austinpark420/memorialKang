import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Modal from 'react-modal';

import {
  loadMemorialHistories,
  addMemorialHistory
} from '../actions/memorialHistories';

import styles from '../css/memorialHistories.module.scss';

const MemorialHistory = ({
  match: { url },
  isAuthenticated,
  allImages,
  loadMemorialHistories,
  addMemorialHistory
}) => {
  const path = url.split('/')[1];

  useEffect(() => {
    loadMemorialHistories(path);
  }, [loadMemorialHistories, path]);

  // react-modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // // react-modal form

  const handleSubmit = event => {
    event.preventDefault();

    let memorialHistoryForm = document.getElementById(
      `${styles.memorialHistoryForm}`
    );
    let formData = new FormData(memorialHistoryForm);

    addMemorialHistory(path, formData);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isAuthenticated && (
          <button className={styles.add} onClick={openModal}>
            기조 업로드
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
            id={styles.memorialHistoryForm}
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
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
        <ul className={styles.group}>
          {allImages &&
            allImages.map(allImage => (
              <li>
                <Link to={`${url}/${allImage._id}`}>
                  <img src={allImage.images[0]} alt='memorialHistory' />
                  <section>
                    <h3>기조</h3>
                    <p>{allImage.title}</p>
                  </section>
                </Link>
              </li>
            ))}
        </ul>
        <Route path={`${url}/:id`} component={Image} />
      </div>
    </div>
  );
};

let mapStateToProps = state => ({
  allImages: state.memorialHistories.allImages,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loadMemorialHistories,
  addMemorialHistory
})(MemorialHistory);
