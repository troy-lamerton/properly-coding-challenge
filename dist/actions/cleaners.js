'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadNearby = loadNearby;
exports.loadBest = loadBest;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadNearby() {
  return function (dispatch) {
    return (0, _isomorphicFetch2.default)('http://localhost:3000/cleaners/nearby/37.77/122.42').then(function (response) {
      return response.json();
    });
    //.then(json => return dispatch(updateCleaners))
    //.catch(...)
  };
}

function loadBest() {
  return function (dispatch) {
    return (0, _isomorphicFetch2.default)('http://localhost:3000/cleaners/best');
  };
}