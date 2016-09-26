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
	};

	const bestCleanersAction = {};
	bestCleanersAction[CALL_HTTP] = caller;

	return bestCleanersAction;
}

export function loadNearby() {
	const caller = {
		endpoint: 'cleaners/nearby/37.77/-122.42',
		types: [
			constants.FETCH_CLEANERS_REQUEST,
			constants.FETCH_CLEANERS_SUCCESS,
			constants.FETCH_CLEANERS_FAILURE
		]
	};

	const nearbyCleanersAction = {};
	nearbyCleanersAction[CALL_HTTP] = caller;

	return nearbyCleanersAction;
}

