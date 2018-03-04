import { combineReducers } from 'redux'
import anchorReducer from './anchorReducer';

export default combineReducers({
  anchorVisibility: anchorReducer
});