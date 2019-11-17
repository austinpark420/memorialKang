import {
  LOAD_NOTICES,
  LOAD_EMERGENCIES,
  NOTICES_ERROR,
  EMERGENCIES_ERROR
} from 'actions/types';

const initialState = {
  notices: [],
  emergencies: [],
  notices_error: null,
  emergencies_error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_NOTICES:
      return {
        ...state,
        notices: [...payload]
      };
    case LOAD_EMERGENCIES:
      return {
        ...state,
        emergencies: [...payload]
      };
    case NOTICES_ERROR:
      return {
        notices_error: payload
      };
    case EMERGENCIES_ERROR:
      return {
        emergencies_error: payload
      };
    default:
      return state;
  }
};
