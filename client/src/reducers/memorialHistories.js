import {
  LOAD_MEMORIALHISTORIES,
  LOAD_MEMORIALHISTORY,
  ADD_MEMORIALHISTORY,
  EDIT_MEMORIALHISTORY,
  REMOVE_MEMORIALHISTORY
} from '../actions/types';

const initialState = {
  allImages: [],
  detailImages: [],
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
        allImages: payload,
        detailImages: []
      };
    case EDIT_MEMORIALHISTORY:
      return {
        ...state,
        detailImages: payload
      };
    case LOAD_MEMORIALHISTORY:
      return {
        ...state,
        loading: true,
        detailImages: payload
      };

    case REMOVE_MEMORIALHISTORY:
      return {
        ...state,
        allImages: payload,
        detailImages: []
      };
    default:
      return state;
  }
};
