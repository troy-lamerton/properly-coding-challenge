'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadBest = loadBest;
exports.loadNearby = loadNearby;

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _fetch = require('../middleware/fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadBest() {
	var caller = {
		endpoint: 'cleaners/best',
		types: [_constants2.default.FETCH_CLEANERS_REQUEST, _constants2.default.FETCH_CLEANERS_SUCCESS, _constants2.default.FETCH_CLEANERS_FAILURE]
	};

	var bestCleanersAction = {};
	bestCleanersAction[_fetch.CALL_HTTP] = caller;

	return bestCleanersAction;
}

function loadNearby() {
	var caller = {
		endpoint: 'nearby/37.77/122.42',
		types: [_constants2.default.FETCH_CLEANERS_REQUEST, _constants2.default.FETCH_CLEANERS_SUCCESS, _constants2.default.FETCH_CLEANERS_FAILURE]
	};

	var nearbyCleanersAction = {};
	nearbyCleanersAction[_fetch.CALL_HTTP] = caller;

	return nearbyCleanersAction;
}