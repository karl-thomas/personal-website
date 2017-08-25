// @flow
import axios from 'axios';
import { SET_SEARCH_TERM, ADD_API_DATA } from './actions';

// takes in a search term, returns well formatted action that can go into redux,
// this will hit the reducer, the reduer will switch on the action type and change state.
export function setSearchTerm(searchTerm: string) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

// what actually gets sent to redux store, with the result of the thunk
export function addApiData(apiData: Show) {
  return { type: ADD_API_DATA, payload: apiData };
}

// this is a thunk, a function that dispatches to the reducer, a callback, async, whatever.
// gets called by the details component to load the rating info.
export function getApiDetails(imdbID: string) {
  return (dispatch: Function) => {
    axios
      .get(`http://localhost:3000/${imdbID}`)
      .then(response => {
        dispatch(addApiData(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}
