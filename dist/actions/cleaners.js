'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBest = loadBest;
exports.loadNearby = loadNearby;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _fetch = require('../middleware/fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadBest() {
  var caller = {
    endpoint: 'cleaners/best',
    types: [_constants2.default.FETCH_CLEANERS_REQUEST, _constants2.default.FETCH_CLEANERS_SUCCESS, _constants2.default.FETCH_CLEANERS_FAILURE]
  };

  var bestCleanersAction = {
    type: _constants2.default.GET_CLEANERS
  };
  bestCleanersAction[_fetch.CALL_HTTP] = caller;

  return bestCleanersAction;
}

function loadNearby() {
  return function (dispatch) {
    return (0, _isomorphicFetch2.default)('http://localhost:3000/cleaners/nearby/37.77/122.42').then(function (response) {
      return response.json();
    });
    //.then(json => return dispatch(updateCleaners))
    //.catch(...)
  };
}