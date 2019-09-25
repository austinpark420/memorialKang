import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Post } from 'components';

import { loadPosts } from '../actions/posts';
import dateFormat from 'dateformat';

import 'css/common.scss';
import 'css/notice.scss';

const Notice = ({ match, posts: { posts }, loadPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Pagination
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
    <div className='notice-wrap'>
      <h2>공지사항</h2>

      <div className='group'>
        <div className='subtitle'>
          <span>제목</span>
          <span>글쓴이</span>
          <span>등록일</span>
        </div>
        <ul className='postList'>
          {!!posts &&
            currentPosts.map((post, index) => (
              <Link to={`${match.url}/${post._id}`}>
                <li key={index}>
                  <div>
                    <span>{post.title}</span>
                    <span>{post.writer}</span>
                    <span>{dateFormat(post.date, 'yyyy-mm-dd')}</span>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
        <ul className='pagination'>
          {pageNumbers.map((number, index) =>
            currentPage === number ? (
              <li
                className='active'
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
      </div>

      <Route path={`${match.url}/:id`} component={Post} />
    </div>
  );
};

const mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  { loadPosts }
)(Notice);
