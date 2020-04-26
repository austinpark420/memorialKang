import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import $ from 'jquery';

import { loadVideos, addVideo, removeVideo } from '../actions/videos';
import styles from '../css/videos.module.scss';

Modal.setAppElement('#root');

const Video = ({
  match: { url },
  videos,
  loadVideos,
  removeVideo,
  addVideo,
  isAuthenticated,
}) => {
  const path = url.split('/')[1];

  // filter video
  const documentaryVideos = videos.filter(
    (video) => video.category === 'documentary'
  );
  const ceremonyVideos = videos.filter(
    (video) => video.category === 'ceremony'
  );

  useEffect(() => {
    loadVideos(path);
  }, [loadVideos, path]);

  // menu tab
  useEffect(() => {
    $(`.${styles.tab}`).on('click', function () {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.videoList').removeClass(`${styles.activeVideo}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeVideo}`);
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
  const [formData, setFormData] = useState({
    path,
    category: '',
    content: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickRemove = (id) => {
    if (window.confirm('선택한 영상을 삭제하시겠습니까?')) {
      removeVideo(id);
    } else {
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addVideo(formData);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <ul className={styles.heading}>
          <li
            className={`${styles.tab} ${styles.active}`}
            rel='ceremony'
            tabIndex='0'
          >
            <h2>추모제 영상</h2>
          </li>
          <li className={`${styles.tab}`} rel='documentary' tabIndex='1'>
            <h2>다큐멘터리</h2>
          </li>
        </ul>

        {isAuthenticated && (
          <button className={styles.add} onClick={openModal}>
            영상 업로드
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
          <form id={styles.videoForm} onSubmit={handleSubmit}>
            <div className={styles.radio}>
              <label htmlFor='category'>
                <span>다큐멘터리</span>
                <input
                  name='category'
                  value='documentary'
                  onChange={handleChange}
                  type='radio'
                  required
                />
              </label>
              <label htmlFor='category'>
                <span>추모제</span>
                <input
                  name='category'
                  value='ceremony'
                  onChange={handleChange}
                  type='radio'
                  required
                />
              </label>
            </div>

            <label htmlFor='content'>유튜브 URL</label>
            <p className={styles.youtube}>
              <span>https://youtu.be/</span>
              <input
                type='text'
                className={styles.content}
                name='content'
                id='content'
                onChange={handleChange}
              />
            </p>
            <input type='submit' value='등록' />
          </form>
          <button className={styles.exit}></button>
        </Modal>

        <section>
          <ul className={`videoList ceremony ${styles.activeVideo}`}>
            {videos &&
              ceremonyVideos.map((video) => (
                <li key={video._id}>
                  {isAuthenticated && (
                    <button
                      className={styles.removeVideo}
                      children='X'
                      onClick={() => handleClickRemove(video._id)}
                    />
                  )}
                  <iframe
                    title={video.content}
                    height='315'
                    src={`https://www.youtube.com/embed/${video.content}`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </li>
              ))}
          </ul>
          <ul className={`videoList documentary`}>
            {videos &&
              documentaryVideos.map((video) => (
                <li key={video._id}>
                  {isAuthenticated && (
                    <button
                      className={styles.removeVideo}
                      children='X'
                      onClick={() => handleClickRemove(video._id)}
                    />
                  )}
                  <iframe
                    title={video.content}
                    height='315'
                    src={`https://www.youtube.com/embed/${video.content}`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => ({
  videos: state.videos.videos,
  isAuthenticated: state.auth.isAuthenticated,
});

Video.propTypes = {
  videos: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadVideos: PropTypes.func.isRequired,
  addVideo: PropTypes.func.isRequired,
  removeVideo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadVideos, addVideo, removeVideo })(
  Video
);
