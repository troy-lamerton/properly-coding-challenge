import fetch from 'isomorphic-fetch';

export function loadNearby() {
	return (dispatch) => {
		return fetch('http://localhost:3000/cleaners/nearby/37.77/122.42')
      .then(response => response.json())
      //.then(json => return dispatch(updateCleaners))
      //.catch(...)
	};
}

export function loadBest() {
  return (dispatch) => {
    return fetch('http://localhost:3000/cleaners/best')
  };
}
