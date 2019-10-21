import axios from 'axios';
import { LOAD_VIDEOS, VIDEO_ERROR, ADD_VIDEO } from './types';

// Load videos
export const loadVideos = videos => async dispatch => {
  try {
    const res = await axios.get(`/api/${videos}`);

    dispatch({
      type: LOAD_VIDEOS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: VIDEO_ERROR
    });
  }
};

// Add video
export const addVideo = ({ path, category, content }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ category, content });

  try {
    const res = await axios.post(`/api/${path}`, body, config);
    dispatch({
      type: ADD_VIDEO,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: VIDEO_ERROR,
      payload: errors
    });
  }
};
