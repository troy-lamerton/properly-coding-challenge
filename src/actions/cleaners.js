import fetch from 'isomorphic-fetch';

import constants from '../constants';
import { CALL_HTTP } from '../middleware/fetch';

export function loadBest() {
  const caller = {
    endpoint: 'cleaners/best',
    types: [
      constants.FETCH_CLEANERS_REQUEST,
      constants.FETCH_CLEANERS_SUCCESS,
      constants.FETCH_CLEANERS_FAILURE
    ]
  }


  const bestCleanersAction = {
    type: constants.GET_CLEANERS
  };
  bestCleanersAction[CALL_HTTP] = caller;

  return bestCleanersAction;
}

export function loadNearby() {
  return dispatch => {
    return fetch('http://localhost:3000/cleaners/nearby/37.77/122.42')
      .then(response => response.json())
      //.then(json => return dispatch(updateCleaners))
      //.catch(...)
  };
}

