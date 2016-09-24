'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxRouter = require('redux-router5');

var _fetch = require('./middleware/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _onactivate = require('./middleware/onactivate');

var _onactivate2 = _interopRequireDefault(_onactivate);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(router) {
	var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var stack = (0, _redux.compose)((0, _redux.applyMiddleware)((0, _fetch2.default)(), (0, _reduxRouter.router5Middleware)(router), (0, _onactivate2.default)(_routes2.default)))(_redux.createStore);

	var store = stack(_reducers2.default, state);
	return store;
}