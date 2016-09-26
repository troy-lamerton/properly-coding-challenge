'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _cleaners = require('../actions/cleaners');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CleanersList = function (_React$Component) {
	_inherits(CleanersList, _React$Component);

	function CleanersList() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, CleanersList);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CleanersList.__proto__ || Object.getPrototypeOf(CleanersList)).call.apply(_ref, [this].concat(args))), _this), _this.loadBest = function () {
			return function (event) {
				event.preventDefault();
				// load cleaners from the database
				_this.props.loadBest();
			};
		}, _this.loadNearby = function () {
			return function (event) {
				event.preventDefault();
				// load cleaners from the database
				_this.props.loadNearby();
			};
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(CleanersList, [{
		key: 'render',
		value: function render() {
			var cleaners = this.props.cleaners;
			var loadBest = this.loadBest;
			var loadNearby = this.loadNearby;

			return _react2.default.createElement(
				'div',
				{ className: 'cleaners-list' },
				_react2.default.createElement(
					'a',
					{ onClick: loadNearby() },
					'Cleaners Nearby'
				),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'a',
					{ onClick: loadBest() },
					'Best Cleaners'
				),
				_react2.default.createElement(
					'ul',
					{ className: 'list' },
					cleaners.map(function (cleaner, index) {
						return _react2.default.createElement(
							'li',
							{ key: index, className: 'cleaner' },
							_react2.default.createElement(
								'div',
								{ className: 'profile-pic' },
								_react2.default.createElement('img', { src: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'cleaner-info' },
								cleaner.name,
								_react2.default.createElement(
									'ul',
									{ className: 'star-list' },
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('img', { className: 'star', src: '/star.png' })
									)
								)
							)
						);
					})
				)
			);
		}
	}]);

	return CleanersList;
}(_react2.default.Component);

CleanersList.propTypes = {
	cleaners: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		rating: _react.PropTypes.number.isRequired,
		name: _react.PropTypes.string
	}))
};

function mapStateToProps(state) {
	return {
		cleaners: state.cleaners.payload
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadBest: function loadBest() {
			dispatch((0, _cleaners.loadBest)());
		},
		loadNearby: function loadNearby() {
			dispatch((0, _cleaners.loadNearby)());
		}
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CleanersList);