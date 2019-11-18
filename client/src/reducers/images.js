import {
  LOAD_IMAGES,
  LOAD_IMAGE,
  ADD_IMAGE,
  EDIT_IMAGE,
  REMOVE_IMAGE
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
    case LOAD_IMAGES:
    case ADD_IMAGE:
      return {
        ...state,
        loading: false,
        allImages: payload,
        detailImages: []
      };
    case EDIT_IMAGE:
      return {
        ...state,
        detailImages: payload
      };
    case LOAD_IMAGE:
      return {
        ...state,
        loading: true,
        detailImages: payload
      };

    case REMOVE_IMAGE:
      return {
        ...state,
        allImages: payload,
        detailImages: []
      };
    default:
      return state;
  }
};
