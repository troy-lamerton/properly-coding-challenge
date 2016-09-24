'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxRouter = require('redux-router5');

var _cleanersList = require('./cleaners-list');

var _cleanersList2 = _interopRequireDefault(_cleanersList);

var _notFound = require('./not-found');

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(_ref) {
	var route = _ref.route;

	if (!route || route.name === '404') {
		return _react2.default.createElement(_notFound2.default, null);
	}

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_cleanersList2.default, null)
	);
}

App.propTypes = {
	route: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)((0, _reduxRouter.routeNodeSelector)(''))(App);