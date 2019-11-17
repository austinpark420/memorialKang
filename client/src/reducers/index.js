import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import videos from './videos';
import images from './images';
import alert from './alert';
import mainPosts from './mainPosts';

export default combineReducers({
  auth,
  posts,
  videos,
  images,
  alert,
  mainPosts
});
