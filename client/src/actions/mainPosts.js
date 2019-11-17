import axios from 'axios';

import {
  LOAD_NOTICES,
  LOAD_EMERGENCIES,
  NOTICES_ERROR,
  EMERGENCIES_ERROR
} from './types';

// Load Notices
export const loadNotices = () => async dispatch => {
  try {
    const res = await axios.get(`/api/notices/mainPosts`);

    dispatch({
      type: LOAD_NOTICES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: NOTICES_ERROR
    });
  }
};

// Load Emergencies
export const loadEmergencies = () => async dispatch => {
  try {
    const res = await axios.get(`/api/emergencies/mainPosts`);

    dispatch({
      type: LOAD_EMERGENCIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EMERGENCIES_ERROR
    });
  }
};
