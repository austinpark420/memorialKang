import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Post, NewPost } from 'components';

import { loadPosts } from '../actions/posts';
import dateFormat from 'dateformat';

import 'css/common.scss';
import 'css/notice.scss';

const Notice = ({ match: { url }, posts, isAuthenticated, loadPosts }) => {
  useEffect(() => {
    loadPosts('notices');
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

  return (
    <div className='notice-wrap'>
      <h2>공지사항</h2>

      <div className='group'>
        <div className='subtitle'>
          <span>번호</span>
          <span>분류</span>
          <span>제목</span>
          <span>글쓴이</span>
          <span>등록일</span>
        </div>
        <ul className='postList'>
          {posts &&
            currentPosts.map((post, index) => (
              <Link to={`${url}/${post._id}`}>
                <li key={index}>
                  <div>
                    <span>{index}</span>
                    <span>{post.category}</span>
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
        {isAuthenticated && (
          <button className='new-post'>
            <Link to={`${url}/write`}>글쓰기</Link>
          </button>
        )}
      </div>

      <Route path={`${url}/:id`} component={Post} />
      <Route path={`${url}/write`} component={NewPost} />
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadPosts }
)(Notice);
