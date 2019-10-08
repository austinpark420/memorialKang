import React, { useState, useEffect } from 'react';
import { editPost } from 'actions/posts';
import { Redirect } from 'react-router-dom';

import $ from 'jquery';
import { connect } from 'react-redux';

import 'css/common.scss';
import 'css/editPost.scss';

const EditPost = ({ match: { url }, editPost, posts: { post, loading } }) => {
  const path = url.split('/')[1];

  const { _id, title, category, content } = post;

  const [formData, setFormData] = useState({
    path,
    _id,
    title,
    category,
    content
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
    editPost(formData);
  };

  if (loading) {
    return <Redirect to={`/${path}/${post._id}`}></Redirect>;
  }

  return (
    <div className='editPost-wrap'>
      <form id='post_form' onSubmit={handleSubmit}>
        <label htmlFor='title'>제목</label>
        <input
          id='title'
          name='title'
          type='text'
          defaultValue={title}
          onChange={handleChange}
        />
        <label htmlFor='category'>분류</label>
        <select id='category' name='category'>
          <option value=''>카테고리 설정</option>
          <option value='행사일정'>행사일정</option>
          <option value='예결산보고'>예결산보고</option>
          <option value='활동보고'>활동보고</option>
        </select>
        <label htmlFor='content'>내용</label>
        <textarea
          form='post_form'
          className='content'
          name='content'
          id='content'
          onChange={handleChange}
          defaultValue={content}
        />
        <input type='submit' value='등록하기' />
      </form>
      <button className='list'>취소</button>
    </div>
  );
};

let mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  { editPost }
)(EditPost);
