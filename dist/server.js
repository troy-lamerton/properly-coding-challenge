'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.averageCleanerRatings = averageCleanerRatings;
exports.formatOrderCleaners = formatOrderCleaners;

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

/* remove location data and average the cleaners ratings */
function averageCleanerRatings(cleanersArray) {
	var round = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	return cleanersArray.map(function (cleaner) {
		delete cleaner.lat;
		delete cleaner.lng;

		// compute the average rating if it hasn't been already
		if (!cleaner.rating) {
			cleaner.rating = cleaner.ratings.reduce(function (sum, number) {
				return sum + number;
			}) / cleaner.ratings.length;
		} else {
			cleaner.rating = cleaner.rating;
		}

		if (round) {
			// round rating to nearest 0.5
			cleaner.rating = Math.round(cleaner.rating * 2) / 2;
		}
		return cleaner;
	});
}

function sortByRating(a, b) {
	return b.rating - a.rating;
}

function formatOrderCleaners(cleaners) {
	var bestCleaners = [[], [], []];

	// split best cleaners into rating intervals
	cleaners.forEach(function (cleaner) {
		if (cleaner.rating >= 4) {
			bestCleaners[0].push(cleaner);
		} else if (cleaner.rating >= 3) {
			bestCleaners[1].push(cleaner);
		} else if (cleaner.rating >= 2) {
			bestCleaners[2].push(cleaner);
		}
	});

	// order each interval by response rate
	bestCleaners = bestCleaners.map(function (cleaners) {
		return cleaners.sort(function (a, b) {
			return b.responseRate - a.responseRate;
		});
	});
	// concatenate the arrays into one
	bestCleaners = bestCleaners.reduce(function (cleaners, currentArray) {
		return cleaners.concat(currentArray);
	});

	return bestCleaners;
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

		var nearbyCleanersAveraged = averageCleanerRatings(nearbyCleaners, true);

		// sort cleaners descending by rating
		nearbyCleanersAveraged.sort(sortByRating);

		res.status(200).json(nearbyCleanersAveraged);
	});
});

cleanersRouter.get('/best', function (req, res) {
	_fs2.default.readFile(_path2.default.join(__dirname, '../src/database/database.json'), 'utf8', function (err, data) {
		if (err) {
			throw err;
		}

		var dataObject = JSON.parse(data);
		var allCleaners = averageCleanerRatings(dataObject);
		allCleaners.sort(sortByRating);

		// round ratings to nearest 0.5
		allCleaners = averageCleanerRatings(allCleaners, true);

		var bestCleaners = formatOrderCleaners(allCleaners);

		res.status(200).json(bestCleaners);
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