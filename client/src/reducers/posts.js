// import axios from 'axios';
import {
  LOAD_POSTS,
  LOAD_POST
  // EDIT_POST,
  // REMOVE_POST,
  // POST_ERRORS
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...payload]
      };
    case LOAD_POST:
      return {
        ...state,
        post: payload
      };
    // case POST_ERRORS:
    //   return {
    //     error:...payload
    //   };
    default:
      return state;
  }
};
