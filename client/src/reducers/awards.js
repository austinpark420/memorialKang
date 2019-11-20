import {
  LOAD_AWARDS,
  ADD_AWARD,
  EDIT_AWARD,
  REMOVE_AWARD,
  AWARD_ERROR
} from '../actions/types';

const initialState = {
  awards: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_AWARDS:
    case ADD_AWARD:
    case EDIT_AWARD:
    case REMOVE_AWARD:
      return {
        ...state,
        awards: [...payload]
      };
    case AWARD_ERROR:
      return {
        error: payload
      };
    default:
      return state;
  }
};
