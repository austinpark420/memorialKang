import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import $ from 'jquery';
import dateFormat from 'dateformat';

import { Post, NewPost } from '../components';
import { loadPosts } from '../actions/posts';
import styles from '../css/document.module.scss';

const Documentary = ({ match: { url }, posts, isAuthenticated, loadPosts }) => {
  useEffect(() => {
    loadPosts('documents');
    // Tab Toggle
    $(`.${styles.tab}`).on('click', function() {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.documentList').removeClass(`${styles.activeDocument}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeDocument}`);
    });
  }, [loadPosts]);

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

        <section>
          <div className={`documentList literary ${styles.activeDocument}`}>
            장학생
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loadPosts
})(Documentary);
