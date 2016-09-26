'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onActivateMiddleware;

var _reduxRouter = require('redux-router5');

var TRANSITION_SUCCESS = _reduxRouter.actionTypes.TRANSITION_SUCCESS;
function onActivateMiddleware(routes) {
	return function (_ref) {
		var dispatch = _ref.dispatch;
		return function (next) {
			return function (action) {
				if (action.type === TRANSITION_SUCCESS) {
					var current = routes.find(function (r) {
						return r.name === action.payload.route.name;
					});

					if (current && current.onActivate) {
						current.onActivate(dispatch)(action.payload.route.params);
					}
				}
				next(action);
			};
		};
	};
}