import { LOAD_VIDEOS, ADD_VIDEO, VIDEO_ERROR } from 'actions/types';

const initialState = {
  videos: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_VIDEOS:
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...payload]
      };
    case VIDEO_ERROR:
      return {
        error: payload
      };
    default:
      return state;
  }
};
