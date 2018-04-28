import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import locations from './reducers/locations';
import user from './reducers/user';

export default combineReducers({
  routing: routerReducer,
  user,
  locations
})