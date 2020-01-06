import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { addPost } from '../actions/posts';
import styles from '../css/newPost.module.scss';

const NewPost = ({ match: { url }, addPost, posts: { post } }) => {
  let path = url.split('/')[1];

  if (path === 'documents') {
    path = url.split('/')[2];
  }

  const handleSubmit = event => {
    event.preventDefault();

    let postForm = document.getElementById(`${styles.postForm}`);
    let formData = new FormData(postForm);

    addPost(path, formData);
  };

  if (post) {
    return <Redirect to={`/${path}/${post._id}`}></Redirect>;
  }

  return (
    <div className={styles.wraper}>
      <form
        id={styles.postForm}
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <label htmlFor='title'>제목</label>
        <input id='title' name='title' type='text' required />

        {path === 'notices' && (
          <Fragment>
            <label htmlFor='category'>카테고리</label>
            <select id='category' name='category' required>
              <option value=''>카테고리 설정</option>
              <option value='행사일정'>행사일정</option>
              <option value='예결산보고'>예결산보고</option>
              <option value='활동보고'>활동보고</option>
              <option value='기타'>기타</option>
            </select>
          </Fragment>
        )}

        {path === 'awards' && (
          <Fragment>
            <label htmlFor='winner'>수상자</label>
            <input id='winnter' name='winner' type='text' required />
          </Fragment>
        )}

        <label htmlFor='files'>파일</label>
        <input type='file' name='files' id='files' multiple />
        <label htmlFor='content'>내용</label>
        <textarea form={styles.postForm} name='content' id='content' />
        <input type='submit' value='등록하기' />
      </form>
      <button className={styles.exit}>
        <Link to={`/${path}`} children='취소' />
      </button>
    </div>
  );
};

let mapStateToProps = state => ({ posts: state.posts });

export default connect(mapStateToProps, { addPost })(NewPost);
