import { combineReducers } from 'redux';
import {locationReducer} from './locationReducer/index';

/* Root Reducer - combine all reducers in here*/
export default combineReducers({
  locations: locationReducer
});