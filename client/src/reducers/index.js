import { combineReducers } from 'redux';
import App_reducer from './App_reducer';
import auth from './auth';
import posts from './posts';

export default combineReducers({
  App_reducer,
  auth,
  posts
});
