import axios from 'axios';
import { setAlert } from './alert';

import {
  LOAD_POSTS,
  LOAD_POST,
  POST_ERROR,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST
} from './types';

// Load posts
export const loadPosts = posts => async dispatch => {
  try {
    const res = await axios.get(`/api/${posts}`);

    dispatch({
      type: LOAD_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR
    });
  }
};

// Load post
export const loadPost = path => async dispatch => {
  try {
    const res = await axios.get(`/api${path}`);
    dispatch({
      type: LOAD_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add post
export const addPost = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.post(`/api/${path}`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('게시물이 등록되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });

    dispatch(setAlert(errors));
  }
};

// Edit post
export const editPost = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.put(`/api/${path}`, formData, config);
    dispatch({
      type: EDIT_POST,
      payload: res.data
    });

    dispatch(setAlert('게시물이 수정되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });

    dispatch(setAlert(errors));
  }
};

// delete post
export const removePost = path => async dispatch => {
  try {
    await axios.delete(`/api${path}`);

    dispatch({
      type: REMOVE_POST
    });

    dispatch(setAlert('게시물이 삭제되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};
