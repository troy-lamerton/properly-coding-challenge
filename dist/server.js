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

function averageCleanerRatings(cleanersArray) {
	return cleanersArray.map(function (cleaner) {
		var editedCleaner = {
			name: cleaner.name
		};
		editedCleaner.rating = cleaner.ratings.reduce(function (sum, number) {
			return sum + number;
		}) / cleaner.ratings.length;

		// round rating to nearest 0.5
		editedCleaner.rating = Math.round(editedCleaner.rating * 2) / 2;

		return editedCleaner;
	});
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

		// remove location data and average the cleaners ratings
		var nearbyCleanersAveraged = averageCleanerRatings(nearbyCleaners);

		// sort cleaners descending by rating
		nearbyCleanersAveraged.sort(function (a, b) {
			return b.rating - a.rating;
		});

		res.status(200).json(nearbyCleanersAveraged);
	});
});

cleanersRouter.get('/best', function (req, res) {
	_fs2.default.readFile(_path2.default.join(__dirname, '../src/database/database.json'), 'utf8', function (err, data) {
		res.status(200).json(data);
	});
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(_path2.default.resolve(__dirname, 'index.html'));
});

if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

exports.default = app;