import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editPost } from '../actions/posts';
import styles from '../css/editPost.module.scss';

const EditPost = ({
  match: { url },
  editPost,
  posts: { post, error, loading }
}) => {
  const path = url.split('/')[1];
  const [redirectToPost, setRedirectToPost] = useState(false);

  const { _id, title, content } = post;

  const handleSubmit = event => {
    event.preventDefault();

    let editPostForm = document.getElementById(`${styles.editPostForm}`);
    let formData = new FormData(editPostForm);

    editPost(path, formData);
    setRedirectToPost(true);
  };

  if (redirectToPost) {
    return <Redirect to={`/${path}/${post._id}`}></Redirect>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <form
          id={styles.editPostForm}
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <label htmlFor='_id'>고유번호</label>
          <input id='_id' name='_id' type='text' defaultValue={_id} />
          <label htmlFor='title'>제목</label>
          <input
            id='title'
            name='title'
            type='text'
            defaultValue={title}
            required
          />
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
          <label htmlFor='files'>파일</label>
          <input
            type='file'
            className={styles.files}
            name='files'
            id='files'
            defaultValue=''
            multiple
          />
          <label htmlFor='content'>내용</label>
          <textarea
            form={styles.editPostForm}
            className={styles.content}
            name='content'
            id='content'
            defaultValue={content}
          />
          <input type='submit' value='수정하기' />
        </form>
        <button className={styles.exit}>
          <Link to={`/${path}`}> 취소</Link>
        </button>
      </div>
    </div>
  );
};

let mapStateToProps = state => ({ posts: state.posts });

EditPost.propTypes = {
  posts: PropTypes.array.isRequired,
  editPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { editPost })(EditPost);
