import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from 'actions/types';

export const setAlert = (message, timeout = 3000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { message, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
