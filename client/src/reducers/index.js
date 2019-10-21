import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import videos from './videos';
import images from './images';

export default combineReducers({
  auth,
  posts,
  videos,
  images
});
