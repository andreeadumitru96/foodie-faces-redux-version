import { combineReducers } from 'redux';
import { locationReducer } from './locationReducer/index';
import { userReducer } from './userReducer/index';

/* Root Reducer - combine all reducers in here*/
export default combineReducers({
  locations: locationReducer,
  users: userReducer
});