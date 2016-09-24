'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = configureRouter;

var _router = require('router5');

var _router2 = _interopRequireDefault(_router);

var _router5History = require('router5-history');

var _router5History2 = _interopRequireDefault(_router5History);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureRouter() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	options = _extends({
		useHash: false,
		trailingSlash: false,
		defaultRoute: '404'
	}, options);

	var router = new _router2.default([], options);

	router.usePlugin((0, _router5History2.default)());
	router.add(_routes2.default);

	return router;
}