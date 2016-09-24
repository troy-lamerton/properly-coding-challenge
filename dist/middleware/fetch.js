'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CALL_HTTP = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-unused-vars: 0 */


exports.checkStatus = checkStatus;
exports.default = fetchMiddleware;

require('isomorphic-fetch');

var _errbot = require('errbot');

var _errbot2 = _interopRequireDefault(_errbot);

var _httpClient = require('http-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALL_HTTP = exports.CALL_HTTP = Symbol('CALL_HTTP');

function checkStatus(response) {
	var ok = response.ok;
	var status = response.status;
	var statusText = response.statusText;


	if (ok) {
		return response;
	}

	throw _errbot2.default.create(status, statusText);
}

function fetchMiddleware() {
	var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	settings = _extends({
		accept: 'application/json',
		type: 'application/json',
		host: '/',
		field: 'jsonData',
		options: {
			credentials: 'include'
		}
	}, settings);

	var stack = (0, _httpClient.createStack)((0, _httpClient.base)(settings.host), (0, _httpClient.accept)(settings.accept), (0, _httpClient.header)('Content-Type', settings.type), (0, _httpClient.parseJSON)());

	if (Object.keys(settings.options).length) {
		for (var key in settings.options) {
			stack = (0, _httpClient.createStack)(stack, (0, _httpClient.init)(key, settings.options[key]));
		}
	}

	return function (_ref) {
		var getState = _ref.getState;
		return function (next) {
			return function (action) {
				var caller = action[CALL_HTTP];

				if (typeof caller === 'undefined') {
					return next(action);
				}

				var options = {
					method: 'get',
					cache: false
				};

				if (caller.options) {
					options = _extends({ options: options }, caller.options);
				}

				if (options.cache && typeof options.cache === 'function') {
					if (options.cache(getState())) {
						return;
					}
				}

				var endpoint = caller.endpoint;

				var _caller$types = _slicedToArray(caller.types, 3);

				var requestType = _caller$types[0];
				var successType = _caller$types[1];
				var errorType = _caller$types[2];


				var client = (0, _httpClient.createStack)(stack, (0, _httpClient.method)(options.method), (0, _httpClient.handleResponse)(checkStatus));

				if (options.body) {
					client = (0, _httpClient.createStack)(client, (0, _httpClient.body)(JSON.stringify(options.body)));
				}

				var request = (0, _httpClient.createFetch)(client);

				next({ type: requestType });

				return request(endpoint).then(function (payload) {
					next({
						type: successType,
						payload: payload[settings.field]
					});
				}).catch(function (error) {
					next({
						type: errorType,
						error: error
					});
				});
			};
		};
	};
}