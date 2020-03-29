import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userClassReducer from './userClassReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user_class: userClassReducer
});
