import axios from 'axios';
import { setAlert } from './alert';
import {
  LOAD_AWARDS,
  AWARD_ERROR,
  ADD_AWARD,
  EDIT_AWARD,
  REMOVE_AWARD
} from './types';

// Load awards
export const loadAwards = () => async dispatch => {
  try {
    const res = await axios.get(`/api/awards`);

    dispatch({
      type: LOAD_AWARDS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AWARD_ERROR
    });
  }
};

// Add award
export const addAward = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`/api/awards`, body, config);
    dispatch({
      type: ADD_AWARD,
      payload: res.data
    });

    dispatch(setAlert('장학생이 등록되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: AWARD_ERROR,
      payload: errors
    });
  }
};

// Edit post
export const editAward = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/awards`, formData, config);
    dispatch({
      type: EDIT_AWARD,
      payload: res.data
    });

    dispatch(setAlert('장학생이 수정되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: AWARD_ERROR,
      payload: errors
    });
  }
};

// Remove award
export const removeAward = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/awards/${id}`);

    dispatch({
      type: REMOVE_AWARD,
      payload: res.data
    });

    dispatch(setAlert('장학생이 삭제되었습니다'));
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: AWARD_ERROR,
      payload: errors
    });
  }
};
