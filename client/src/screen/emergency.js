import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

import ReactPaginate from 'react-paginate';
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

  let pageNumbers = 0;
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers += 1;
  }

  const handleClick = selected => {
    setCurrentPage(selected + 1);
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

          <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageNumbers}
            marginPagesDisplayed={10}
            onPageChange={({ selected }) => handleClick(selected)}
            containerClassName={`${styles.pagination}`}
            activeClassName={`${styles.active}`}
          />

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
