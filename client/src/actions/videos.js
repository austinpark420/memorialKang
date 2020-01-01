import axios from 'axios';
import { setAlert } from './alert';
import { LOAD_VIDEOS, VIDEO_ERROR, ADD_VIDEO, REMOVE_VIDEO } from './types';

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

    dispatch(setAlert('영상이 등록되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: VIDEO_ERROR,
      payload: errors
    });
  }
};

// Remove video
export const removeVideo = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/videos/${id}`);

    dispatch({
      type: REMOVE_VIDEO,
      payload: res.data
    });

    dispatch(setAlert('영상이 삭제되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: VIDEO_ERROR,
      payload: errors
    });
  }
};
