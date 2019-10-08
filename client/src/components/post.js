import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPost, redirectToPost, removePost } from 'actions/posts';

import dateFormat from 'dateformat';

import 'css/common.scss';
import 'css/post.scss';

const Post = ({
  posts: { post },
  loadPost,
  redirectToPost,
  removePost,
  match: { url },
  isAuthenticated
}) => {
  useEffect(() => {
    loadPost(url);
  }, [loadPost, url]);

  const path = url.split('/')[1];

  const handleClickEdit = () => {
    redirectToPost();
  };
  const handleClickRemove = () => {
    removePost(url);
  };

  if (!post) {
    return <Redirect to={`/${path}`}></Redirect>;
  }

  return (
    <div>
      {post && (
        <div className='post-wrap'>
          <h2>{post.title}</h2>
          <section>
            <div className='info'>
              <span>
                <span className='title'>분류</span>
                {post.category}
              </span>
              <span>
                <span className='title'>작성자</span>
                {post.writer}
              </span>
              <span>
                <span className='title'>날짜</span>
                {dateFormat(post.date, 'yyyy-mm-dd')}
              </span>
            </div>
            <p className='content'>{post.content}</p>
          </section>
          <button className='list'>
            <Link to={`/${path}`}>목록</Link>
          </button>
          {isAuthenticated && (
            <Fragment>
              <button onClick={handleClickEdit} className='edit'>
                <Link to={`/${path}/reWrite`}>수정</Link>
              </button>
              <button onClick={handleClickRemove} className='remove'>
                삭제
              </button>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

let mapStateToProps = state => ({
  posts: state.posts,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadPost, redirectToPost, removePost }
)(Post);
