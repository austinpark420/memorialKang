import axios from 'axios';
import {
  LOAD_IMAGES,
  LOAD_IMAGE,
  IMAGE_ERROR,
  ADD_IMAGE,
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
    const res = await axios.post(`/api/${path}`, formData, config);
    dispatch({
      type: ADD_IMAGE,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: IMAGE_ERROR,
      payload: errors
    });
  }
};

// Edit image
// export const editPost = ({
//   path,
//   _id,
//   title,
//   category,
//   content
// }) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   const body = JSON.stringify({ _id, title, category, content });

//   try {
//     const res = await axios.put(`/api/${path}`, body, config);
//     dispatch({
//       type: EDIT_IMAGE,
//       payload: res.data
//     });
//   } catch (error) {
//     const errors = error.response.data.errors;

//     dispatch({
//       type: IMAGE_ERROR,
//       payload: errors
//     });
//   }
// };

// redirect image
// export const redirectToPost = () => dispatch => {
//   dispatch({
//     type: REDIRECT_IMAGE
//   });
// };

// Remove image
export const removeImage = path => async dispatch => {
  try {
    await axios.delete(`/api/${path}`);

    dispatch({
      type: REMOVE_IMAGE
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: IMAGE_ERROR,
      payload: errors
    });
  }
};
