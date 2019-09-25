import axios from 'axios';
import {
  LOAD_POSTS,
  LOAD_POST,
  // ADD_POST,
  // EDIT_POST,
  // REMOVE_POST,
  POST_ERRORS,
  POST_ERROR
} from './types';

// import setAuthToken from '../utils/setAuthToken';

// Load posts

export const loadPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: LOAD_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERRORS
    });
  }
};

// Load post

export const loadPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: LOAD_POST,
      payload: res.data
    });
  } catch (error) {}
};
