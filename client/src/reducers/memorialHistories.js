import {
  LOAD_MEMORIALHISTORIES,
  LOAD_MEMORIALHISTORY,
  // MEMORIALHISTORY_ERROR,
  ADD_MEMORIALHISTORY,
  EDIT_MEMORIALHISTORY,
  REMOVE_MEMORIALHISTORY
} from '../actions/types';

const initialState = {
  images: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MEMORIALHISTORIES:
    case ADD_MEMORIALHISTORY:
      return {
        ...state,
        loading: true,
        images: payload
      };
    case EDIT_MEMORIALHISTORY:
      return {
        ...state,
        images: payload
      };
    case LOAD_MEMORIALHISTORY:
      return {
        ...state,
        loading: true,
        images: payload
      };

    case REMOVE_MEMORIALHISTORY:
      return {
        ...state,
        images: payload
      };
    default:
      return state;
  }
};
