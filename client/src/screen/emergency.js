import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

import dateFormat from 'dateformat';

import { Post, NewPost, Spinner } from '../components';
import { loadPosts } from '../actions/posts';
import styles from '../css/emergency.module.scss';

const Emergency = ({
  match: { url },
  posts: { posts, loading },
  isAuthenticated,
  loadPosts
}) => {
  useEffect(() => {
    loadPosts('emergencies');
  }, [loadPosts]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

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

  return loading === false || currentPosts === null ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <h2>동판사수 대책위원회</h2>

        <div className={styles.group}>
          <div className={styles.subtitle}>
            <span>번호</span>
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
        </div>

        <Route path={`${url}/:id`} component={Post} />
        <Route path={`${url}/write`} component={NewPost} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  isAuthenticated: state.auth.isAuthenticated
});

Emergency.propTypes = {
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loadPosts })(Emergency);
