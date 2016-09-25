'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

var cleanersRouter = _express2.default.Router();

function cleanerIsNearby(myLocation, cleaner) {
	var withinDistance = 0.02;
	return Math.abs(myLocation.lat - cleaner.lat) < withinDistance && Math.abs(myLocation.lng - cleaner.lng) < withinDistance;
}

cleanersRouter.get('/nearby/:lat/:lng', function (req, res) {
	_fs2.default.readFile(_path2.default.join(__dirname, '../src/database/database.json'), 'utf8', function (err, data) {
		if (err) {
			throw err;
		}

		var myLocation = {
			lat: req.params.lat,
			lng: req.params.lng
		};

		var dataObject = JSON.parse(data);
		var nearbyCleaners = dataObject.filter(function (cleaner) {
			return cleanerIsNearby(myLocation, cleaner);
		});

		nearbyCleaners.sort(function (a, b) {
			var aRating = a.ratings.reduce(function (sum, number) {
				return sum + number;
			}) / a.ratings.length;
			var bRating = b.ratings.reduce(function (sum, number) {
				return sum + number;
			}) / b.ratings.length;

			return bRating - aRating;
		});
		res.status(200).json(nearbyCleaners);
	});
});

cleanersRouter.get('/best', function (req, res) {
	var data = [{ name: "John Doe", rating: 4.5 }, { name: "Jane Doe", rating: 2.0 }, { name: "Tim Brown", rating: 4.2 }];

	res.status(200).json(data);
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(_path2.default.resolve(__dirname, 'index.html'));
});

if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

exports.default = app;