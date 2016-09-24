import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import types from '../constants';

export function cleanersReducer(state = { payload: [] }, action) {
	switch (action.type) {
		case types.GET_CLEANERS:
			return { payload: action.payload };
		default:
			return { ...state };
	}
}

export default combineReducers({
	router: router5Reducer,
	cleaners: cleanersReducer
});
