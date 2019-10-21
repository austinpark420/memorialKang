import axios from 'axios';
import {
  LOAD_POSTS,
  LOAD_POST,
  POST_ERROR,
  ADD_POST,
  EDIT_POST,
  REDIRECT_POST,
  REMOVE_POST
} from './types';

let postNumber = 1;

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
export const addPost = ({
  path,
  title,
  category,
  content
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ title, category, content, postNumber });
  postNumber++;

  try {
    const res = await axios.post(`/api/${path}`, body, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

// Edit post
export const editPost = ({
  path,
  _id,
  title,
  category,
  content
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ _id, title, category, content });

  try {
    const res = await axios.put(`/api/${path}`, body, config);
    dispatch({
      type: EDIT_POST,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

// redirect post
export const redirectToPost = () => dispatch => {
  dispatch({
    type: REDIRECT_POST
  });
};

// Remove post
export const removePost = path => async dispatch => {
  try {
    await axios.delete(`/api/${path}`);

    dispatch({
      type: REMOVE_POST
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};
