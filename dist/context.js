'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = configureContext;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router5');

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureContext(store, router) {
	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactRouter.RouterProvider,
			{ router: router },
			_react2.default.createElement(_app2.default, null)
		)
	);
}