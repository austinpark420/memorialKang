import {
  LOAD_POSTS,
  LOAD_POST,
  POST_ERROR,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        loading: true,
        posts: payload,
        post: null
      };
    case ADD_POST:
    case LOAD_POST:
    case EDIT_POST:
      return {
        ...state,
        loading: true,
        post: payload
      };
    case REMOVE_POST:
      return {
        ...state,
        post: null
      };
    case POST_ERROR:
      return {
        error: payload
      };
    default:
      return state;
  }
};
