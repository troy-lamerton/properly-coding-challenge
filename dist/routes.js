'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cleaners = require('./actions/cleaners');

exports.default = [{
	name: 'home',
	path: '/'
}, {
	name: 'local',
	path: '/notes/local',
	onActivate: function onActivate(dispatch) {
		return function (params) {
			dispatch((0, _cleaners.get)());
		};
	}
}, {
	name: 'all',
	path: '/notes/all',
	onActivate: function onActivate(dispatch) {
		return function (params) {
			dispatch((0, _cleaners.load)());
		};
	}
}, {
	name: '404',
	path: '/404'
}]; /* eslint no-unused-vars: 0 */