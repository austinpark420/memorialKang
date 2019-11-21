import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import dateFormat from 'dateformat';

import Spinner from './spinner';
import { loadPost, removePost } from '../actions/posts';
import styles from '../css/post.module.scss';

const Post = ({
  posts,
  loadPost,
  removePost,
  match: { url },
  isAuthenticated
}) => {
  useEffect(() => {
    loadPost(url);
  }, [loadPost, url]);

  const path = url.split('/')[1];
  const [redirectToPosts, setRedirectToPosts] = useState(false);

  const handleClickRemove = async () => {
    if (window.confirm('선택한 게시물을 삭제하시겠습니까?')) {
      try {
        await removePost(url);
        setRedirectToPosts(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (redirectToPosts) {
    return <Redirect to={`/${path}`}></Redirect>;
  }

  return posts.loading === false ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      {posts.post && (
        <div className={styles.wraper}>
          <h2>{posts.post.title}</h2>
          <section>
            <div className={styles.info}>
              <span>
                <span className={styles.title}>분류</span>
                {posts.post.category}
              </span>
              <span>
                <span className={styles.title}>파일</span>
                {posts.post.files &&
                  posts.post.files.locations.map(function(location) {
                    return (
                      <p>
                        <a href={location}>
                          {location
                            .split('/images/')
                            .splice(1, 1)
                            .toString('utf-8')}
                        </a>
                      </p>
                    );
                  })}
              </span>
              <span>
                <span className={styles.title}>작성자</span>
                {posts.post.writer}
              </span>
              <span>
                <span className={styles.title}>날짜</span>
                {dateFormat(posts.post.date, 'yyyy-mm-dd')}
              </span>
            </div>
            <p className={styles.content}>{posts.post.content}</p>
          </section>
          <button className={styles.list}>
            <Link to={`/${path}`}>목록</Link>
          </button>
          {isAuthenticated && (
            <Fragment>
              <button className={styles.edit}>
                <Link to={`/${path}/reWrite`}>수정</Link>
              </button>
              <button onClick={handleClickRemove} className={styles.remove}>
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
  { loadPost, removePost }
)(Post);
