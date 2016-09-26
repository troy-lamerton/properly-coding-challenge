'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Link;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Link(props) {
	var name = props.name;
	var params = props.params;
	var router = props.router;
	var navigateTo = props.navigateTo;
	var options = props.options;

	var href = router.buildUrl(name, params);
	var className = router.isActive(name, params) ? 'active' : '';
	var onClick = function onClick(event) {
		event.preventDefault();
		navigateTo(name, params, options);
	};

	return _react2.default.createElement(
		'a',
		{ href: href, onClick: onClick, className: className },
		props.children
	);
}

Link.propTypes = {
	name: _react.PropTypes.string.isRequired,
	params: _react.PropTypes.object,
	router: _react.PropTypes.object.isRequired,
	navigateTo: _react.PropTypes.func.isRequired,
	options: _react.PropTypes.object,
	children: _react.PropTypes.node
};

Link.defaultProps = {
	params: {},
	options: {}
};