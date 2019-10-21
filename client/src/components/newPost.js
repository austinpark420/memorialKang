import React, { useState, useEffect } from 'react';
import { addPost, redirectToPost } from 'actions/posts';
import { Link, Redirect } from 'react-router-dom';

import $ from 'jquery';
import { connect } from 'react-redux';

import 'css/common.scss';
import 'css/newPost.scss';

const NewPost = ({
  match: { url },
  addPost,
  posts: { post, error, loading }
}) => {
  const path = url.split('/')[1];

  const [formData, setFormData] = useState({
    path,
    title: '',
    category: '',
    content: ''
  });

  useEffect(() => {
    $('#category').on('change', function() {
      let selectedCategory = $(this)
        .children('option:selected')
        .val();

      setFormData({
        ...formData,
        category: selectedCategory
      });
    });
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addPost(formData);
  };

  if (loading) {
    return <Redirect to={`/${path}/${post._id}`}></Redirect>;
  }

  return (
    <div className='newPost-wrap'>
      <form id='post_form' onSubmit={handleSubmit}>
        <label htmlFor='title'>제목</label>
        <input id='title' name='title' type='text' onChange={handleChange} />
        <label htmlFor='category'>분류</label>
        <select id='category' name='category'>
          <option value=''>카테고리 설정</option>
          <option value='행사일정'>행사일정</option>
          <option value='예결산보고'>예결산보고</option>
          <option value='활동보고'>활동보고</option>
        </select>
        {/* <label htmlFor='name'>작성자</label>
        {user && (
          <input
            id='name'
            name='name'
            type='text'
            defaultValue={user.name}
            disabled
          />
        )} */}
        {/* <label htmlFor='date'>작성일</label>
        <input id='date' name='date' type='text' /> */}
        <label htmlFor='content'>내용</label>
        <textarea
          form='post_form'
          className='content'
          name='content'
          id='content'
          onChange={handleChange}
        />
        <input type='submit' value='등록하기' />
      </form>
      <button className='exit'>
        <Link to={`/${path}`} children='취소' />
      </button>
    </div>
  );
};

let mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  { addPost, redirectToPost }
)(NewPost);
