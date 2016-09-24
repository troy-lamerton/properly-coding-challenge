'use strict';

var _reactDom = require('react-dom');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */
var router = (0, _router2.default)();

router.start(function (err, state) {
	if (err) {
		throw err;
	}

	var store = (0, _store2.default)(router, {
		router: { route: state }
	});

	var context = (0, _context2.default)(store, router);

	(0, _reactDom.render)(context, document.getElementById('app'));
});