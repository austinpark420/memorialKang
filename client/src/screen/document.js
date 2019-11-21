import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

import $ from 'jquery';
import dateFormat from 'dateformat';

import { Post, NewPost } from '../components';
import { loadPosts } from '../actions/posts';
import { loadAwards, addAward, removeAward } from '../actions/awards';
import styles from '../css/document.module.scss';

const Documentary = ({
  match: { url },
  posts,
  isAuthenticated,
  loadPosts,
  awards,
  loadAwards,
  addAward,
  removeAward
}) => {
  useEffect(() => {
    loadPosts('documents');
    loadAwards('awards');
    // Tab Toggle
    $(`.${styles.tab}`).on('click', function() {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.documentList').removeClass(`${styles.activeDocument}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeDocument}`);
    });
  }, [loadPosts, loadAwards]);

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
    year: '',
    scholarshipFirst: '',
    scholarshipFirstPrice: '',
    scholarshipSecond: '',
    scholarshipSecondPrice: '',
    scholarshipThird: '',
    scholarshipThirdPrice: '',
    literaryFirst: '',
    literaryFirstAward: '',
    literarySecond: '',
    literarySecondAward: '',
    literaryThird: '',
    literaryThirdAward: ''
  });

  const handleClickRemove = id => {
    if (window.confirm('선택한 영상을 삭제하시겠습니까?')) {
      removeAward(id);
    } else {
      return;
    }
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addAward(formData);
    closeModal();
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = number => {
    setCurrentPage(number);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <div className={styles.coverImage}></div>

        <ul className={styles.heading}>
          <li
            className={`${styles.tab} ${styles.active}`}
            rel='literary'
            tabIndex='0'
          >
            <h2>장학생</h2>
          </li>
          <li className={styles.tab} rel='scholarship' tabIndex='1'>
            <h2>문학상</h2>
          </li>
        </ul>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
        >
          <button className={styles.close} onClick={closeModal}>
            x
          </button>
          <form id={styles.awardForm} onSubmit={handleSubmit}>
            <label htmlFor='year'>연도</label>
            <input
              type='text'
              className={styles.year}
              name='year'
              id='year'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipFirst'>1등 장학생</label>
            <input
              type='text'
              className={styles.scholarship}
              name='scholarshipFirst'
              id='scholarshipFirst'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipFirstPrice'>1등 장학생 장학금</label>
            <input
              type='text'
              className={styles.scholarshipPrice}
              name='scholarshipFirstPrice'
              id='scholarshipFirstPrice'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipSecond'>2등 장학생</label>
            <input
              type='text'
              className={styles.scholarship}
              name='scholarshipSecond'
              id='scholarshipSecond'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipSecondPrice'>2등 장학생 장학금</label>
            <input
              type='text'
              className={styles.scholarshipPrice}
              name='scholarshipSecondPrice'
              id='scholarshipSecondPrice'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipThird'>3등 장학생</label>
            <input
              type='text'
              className={styles.scholarship}
              name='scholarshipThird'
              id='scholarshipThird'
              onChange={handleChange}
            />
            <label htmlFor='scholarshipThirdPrice'>3등 장학생 장학금</label>
            <input
              type='text'
              className={styles.scholarshipPrice}
              name='scholarshipThirdPrice'
              id='scholarshipThirdPrice'
              onChange={handleChange}
            />
            <label htmlFor='literaryFirst'>1등 문학상</label>
            <input
              type='text'
              className={styles.literary}
              name='literaryFirst'
              id='literaryFirst'
              onChange={handleChange}
            />
            <label htmlFor='literaryFirstAward'>1등 문학상 작품 URL</label>
            <input
              type='text'
              className={styles.literaryAward}
              name='literaryFirstAward'
              id='literaryFirstAward'
              onChange={handleChange}
            />
            <label htmlFor='literarySecond'>2등 문학상</label>
            <input
              type='text'
              className={styles.literary}
              name='literarySecond'
              id='literarySecond'
            />
            <label htmlFor='literarySecondAward'>2등 문학상 작품 URL</label>
            <input
              type='text'
              className={styles.literaryAward}
              name='literarySecondAward'
              id='literarySecondAward'
              onChange={handleChange}
            />
            <label htmlFor='literaryThird'>3등 문학상</label>
            <input
              type='text'
              className={styles.literary}
              name='literaryThird'
              id='literaryThird'
              onChange={handleChange}
            />
            <label htmlFor='literaryThirdAward'>3등 문학상 작품 URL</label>
            <input
              type='text'
              className={styles.literaryAward}
              name='literaryThirdAward'
              id='literaryThirdAward'
              onChange={handleChange}
            />
            <input type='submit' value='등록' />
          </form>
          <button className={styles.exit}></button>
        </Modal>

        <section>
          <div className={`documentList literary ${styles.activeDocument}`}>
            {isAuthenticated && (
              <button className={styles.add} onClick={openModal}>
                장학생 업로드
              </button>
            )}
            <ul className={styles.scholarship}>
              {awards &&
                awards.map(award => (
                  <li key={award._id}>
                    {isAuthenticated && (
                      <button
                        className={styles.removeAward}
                        children='X'
                        onClick={() => handleClickRemove(award._id)}
                      />
                    )}
                    <b>{award.year} 년</b>
                    <div>
                      <p>작학생</p>
                      <span>
                        {award.scholarshipFirst} [{award.scholarshipFirstPrice}
                        만원]
                      </span>
                      {award.scholarshipSecond && (
                        <span>
                          {award.scholarshipSecond} [
                          {award.scholarshipSecondPrice} 만원]
                        </span>
                      )}
                      {award.scholarshipThird && (
                        <span>
                          {award.scholarshipThird}[{award.scholarshipThirdPrice}
                          만원]
                        </span>
                      )}
                    </div>
                    <div>
                      <p>문학상</p>
                      <span>
                        1등: {award.literaryFirst}[
                        <Link to={award.literaryFirstAward}>작품보기</Link>]
                      </span>
                      {award.literarySecond && (
                        <span>
                          2등: {award.literarySecond}[
                          <Link to={award.literarySecondAward}>작품보기</Link>]
                        </span>
                      )}
                      {award.literaryThird && (
                        <span>
                          3등: {award.literaryThird}[
                          <Link to={award.literaryThirdAward}>작품보기</Link>]
                        </span>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={`documentList scholarship ${styles.group}`}>
            <div className={styles.postTitle}>
              <span>번호</span>
              <span>분류</span>
              <span>제목</span>
              <span>글쓴이</span>
              <span>등록일</span>
            </div>
            <ul className={styles.postList}>
              {posts &&
                currentPosts.map((post, index) => (
                  <Link to={`${url}/${post._id}`}>
                    <li key={index}>
                      <div>
                        <span>{post.number}</span>
                        <span>{post.category}</span>
                        <span>{post.title}</span>
                        <span>{post.writer}</span>
                        <span>{dateFormat(post.date, 'yyyy-mm-dd')}</span>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>
            <ul className={styles.pagination}>
              {pageNumbers.map((number, index) =>
                currentPage === number ? (
                  <li
                    className={styles.active}
                    key={index}
                    onClick={() => handleClick(number)}
                  >
                    {number}
                  </li>
                ) : (
                  <li key={index} onClick={() => handleClick(number)}>
                    {number}
                  </li>
                )
              )}
            </ul>
            {isAuthenticated && (
              <button className={styles.newPost}>
                <Link to={`${url}/write`}>글쓰기</Link>
              </button>
            )}
            <Route path={`${url}/:id`} component={Post} />
            <Route path={`${url}/write`} component={NewPost} />
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  awards: state.awards.awards,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadPosts, loadAwards, addAward, removeAward }
)(Documentary);
