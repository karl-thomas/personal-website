// @flow
import { combineReducers } from 'redux';
import { SET_SEARCH_TERM } from './actions';

// // i no longer need this because the searchterm reducer takes care of its own default state
// const DEFAULT_STATE = {
//   searchTerm: ''
// };

const searchTerm = (state, action: Action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({ searchTerm }); // the same as {searchTerm: searchTerm}

// no longer need this because the combine reducers takes care of it for me.
// const rootReducer = (state = DEFAULT_STATE, action) => {
//   switch (action.type) {
//     case SET_SEARCH_TERM:
//       return setSearchTerm(state, action);
//     default:
//       return state;
//   }
// };

export default rootReducer;
