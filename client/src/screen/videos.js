import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import $ from 'jquery';
import dateFormat from 'dateformat';

import { loadVideos, addVideo } from '../actions/videos';

import { Icon } from 'antd';

import 'css/common.scss';
import 'css/videos.scss';

Modal.setAppElement('#root');

const Video = ({
  match: { url },
  videos,
  loadVideos,
  addVideo,
  isAuthenticated
}) => {
  const path = url.split('/')[1];

  // filter video
  const documentaryVideos = videos.filter(
    video => video.category === 'documentary'
  );
  const ceremonyVideos = videos.filter(video => video.category === 'ceremony');

  useEffect(() => {
    loadVideos(path);
  }, [loadVideos, path]);

  // menu tab
  useEffect(() => {
    $('.tab').on('click', function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');

      $('.video-list').removeClass('active-video');
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass('active-video');
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
    path,
    category: '',
    content: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addVideo(formData);
    closeModal();
  };

  return (
    <div className='video-wrap'>
      <ul className='heading'>
        <li className='tab active' rel='documentary' tabIndex='0'>
          <h2>다큐멘터리</h2>
        </li>
        <li className='tab' rel='ceremony' tabIndex='1'>
          <h2>추모제 영상</h2>
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
        <form id='video_form' onSubmit={handleSubmit}>
          <div className='radio'>
            <label htmlFor='category'>
              다큐멘터리
              <input
                name='category'
                value='documentary'
                onChange={handleChange}
                type='radio'
              />
            </label>
            <label htmlFor='category'>
              추모제
              <input
                name='category'
                value='ceremony'
                onChange={handleChange}
                type='radio'
              />
            </label>
          </div>

          <label htmlFor='content'>유튜브 URL</label>
          <p className='youtube'>
            <span>https://youtu.be/</span>
            <input
              type='text'
              className='content'
              name='content'
              id='content'
              onChange={handleChange}
            />
          </p>
          <input type='submit' value='영상 업로드' />
        </form>
        <button className='exit'></button>
      </Modal>

      <section>
        <ul className='video-list documentary active-video'>
          {videos &&
            documentaryVideos.map((video, index) => (
              <li key={index}>
                <iframe
                  title={video.content}
                  height='315'
                  src={`https://www.youtube.com/embed/${video.content}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <span>
                  <b>글쓴이</b>
                  {video.writer}
                </span>
                <span>
                  <b>날짜</b>
                  {dateFormat(video.date, 'yyyy-mm-dd')}
                </span>
              </li>
            ))}
        </ul>
        <ul className='video-list ceremony'>
          {videos &&
            ceremonyVideos.map((video, index) => (
              <li key={index}>
                <iframe
                  title={video.content}
                  height='315'
                  src={`https://www.youtube.com/embed/${video.content}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <span>
                  <b>글쓴이</b>
                  {video.writer}
                </span>
                <span>
                  <b>날짜</b>
                  {dateFormat(video.date, 'yyyy-mm-dd')}
                </span>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

let mapStateToProps = state => ({
  videos: state.videos.videos,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadVideos, addVideo }
)(Video);
