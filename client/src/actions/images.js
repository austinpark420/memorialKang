import axios from 'axios';
import { setAlert } from './alert';
import {
  LOAD_IMAGES,
  LOAD_IMAGE,
  IMAGE_ERROR,
  ADD_IMAGE,
  EDIT_IMAGE,
  REMOVE_IMAGE
} from './types';

// Load images
export const loadImages = images => async dispatch => {
  try {
    const res = await axios.get(`/api/${images}`);

    dispatch({
      type: LOAD_IMAGES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: IMAGE_ERROR
    });
  }
};

// Load image

export const loadImage = path => async dispatch => {
  try {
    const res = await axios.get(`/api${path}`);
    dispatch({
      type: LOAD_IMAGE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: IMAGE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add image
export const addImage = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.post(`/api${path}`, formData, config);
    dispatch({
      type: ADD_IMAGE,
      payload: res.data
    });

    dispatch(setAlert('이미지가 등록되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: IMAGE_ERROR,
      payload: errors
    });

    dispatch(setAlert(errors));
  }
};

// Edit image
export const editImage = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.put(`/api${path}`, formData, config);
    dispatch({
      type: EDIT_IMAGE,
      payload: res.data
    });

    dispatch(setAlert('이미지가 수정되었습니다'));
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: IMAGE_ERROR,
      payload: errors
    });

    dispatch(setAlert(errors));
  }
};

// Remove image
export const removeImage = path => async dispatch => {
  try {
    const res = await axios.delete(`/api${path}`);

    dispatch({
      type: REMOVE_IMAGE,
      payload: res.data
    });

    dispatch(setAlert('이미지가 삭제되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: IMAGE_ERROR,
      payload: errors
    });
  }
};
