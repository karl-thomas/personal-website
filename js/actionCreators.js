// @flow

import { SET_SEARCH_TERM } from './actions';

// takes in a search term, returns well formatted action that can go into redux,
// this will hit the reducer, the reduer will switch on the action type and change state.
export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}
