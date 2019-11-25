import axios from 'axios';
import { setAlert } from './alert';
import {
  LOAD_MEMORIALHISTORIES,
  LOAD_MEMORIALHISTORY,
  MEMORIALHISTORY_ERROR,
  ADD_MEMORIALHISTORY,
  EDIT_MEMORIALHISTORY,
  REMOVE_MEMORIALHISTORY
} from './types';

// Load memorialHistories
export const loadMemorialHistories = path => async dispatch => {
  try {
    const res = await axios.get(`/api/${path}`);

    dispatch({
      type: LOAD_MEMORIALHISTORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: MEMORIALHISTORY_ERROR
    });
  }
};

// Load historyMemorialHistory

export const loadMemorialHistory = path => async dispatch => {
  try {
    const res = await axios.get(`/api${path}`);
    dispatch({
      type: LOAD_MEMORIALHISTORY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: MEMORIALHISTORY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add historyMemorialHistory
export const addMemorialHistory = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.post(`/api/${path}`, formData, config);
    dispatch({
      type: ADD_MEMORIALHISTORY,
      payload: res.data
    });

    dispatch(setAlert('추모제연혁이 등록되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: MEMORIALHISTORY_ERROR,
      payload: errors
    });
  }
};

// Edit historyMemorialHistory
export const editMemorialHistory = (path, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.put(`/api/${path}`, formData, config);
    dispatch({
      type: EDIT_MEMORIALHISTORY,
      payload: res.data
    });

    dispatch(setAlert('추모제연혁이 수정되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: MEMORIALHISTORY_ERROR,
      payload: errors
    });
  }
};

// Remove historyMemorialHistory
export const removeMemorialHistory = path => async dispatch => {
  try {
    const res = await axios.delete(`/api${path}`);

    dispatch({
      type: REMOVE_MEMORIALHISTORY,
      payload: res.data
    });

    dispatch(setAlert('추모제연혁이 삭제되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: MEMORIALHISTORY_ERROR,
      payload: errors
    });
  }
};
