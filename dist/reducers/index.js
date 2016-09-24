'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.cleanersReducer = cleanersReducer;

var _redux = require('redux');

var _reduxRouter = require('redux-router5');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanersReducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? { payload: [] } : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _constants2.default.GET_CLEANERS:
			return { payload: action.payload };
		default:
			return _extends({}, state);
	}
}

exports.default = (0, _redux.combineReducers)({
	router: _reduxRouter.router5Reducer,
	cleaners: cleanersReducer
});