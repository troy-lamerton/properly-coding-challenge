import path from 'path';
import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const cleanersRouter = express.Router();

function cleanerIsNearby(myLocation, cleaner) {
	const withinDistance = 0.02;
	return (Math.abs(myLocation.lat - cleaner.lat) < withinDistance &&
	Math.abs(myLocation.lng - cleaner.lng) < withinDistance);
}

/* remove location data and average the cleaners ratings */
function averageCleanerRatings(cleanersArray, round = false) {
	return cleanersArray.map(cleaner => {
		const editedCleaner = {
			name: cleaner.name
		};

		// compute the average rating if it hasn't been already
		if (cleaner.ratings) {
			editedCleaner.rating = cleaner.ratings.reduce((sum, number) => {
				return sum + number;
			}) / cleaner.ratings.length;
		} else {
			editedCleaner.rating = cleaner.rating;
		}

		if (round) {
			// round rating to nearest 0.5
			editedCleaner.rating = Math.round(cleaner.rating * 2) / 2;
		}
		return editedCleaner;
	});
}

function sortByRating(a, b) {
	return b.rating - a.rating;
}

cleanersRouter.get('/nearby/:lat/:lng', (req, res) => {
	fs.readFile(path.join(__dirname, '../src/database/database.json'), 'utf8', (err, data) => {
		if (err) {
			throw err;
		}

		const myLocation = {
			lat: req.params.lat,
			lng: req.params.lng
		};

		const dataObject = JSON.parse(data);
		const nearbyCleaners = dataObject.filter(cleaner => {
			return cleanerIsNearby(myLocation, cleaner);
		});

		const nearbyCleanersAveraged = averageCleanerRatings(nearbyCleaners, true);

		// sort cleaners descending by rating
		nearbyCleanersAveraged.sort(sortByRating);

		res.status(200).json(nearbyCleanersAveraged);
	});
});

cleanersRouter.get('/best', (req, res) => {
	fs.readFile(path.join(__dirname, '../src/database/database.json'), 'utf8', (err, data) => {
		if (err) {
			throw err;
		}

		const dataObject = JSON.parse(data);
		let allCleaners = averageCleanerRatings(dataObject);
		allCleaners.sort(sortByRating);

		const bestCleaners = [
			[],
			[],
			[]
		];

		// round ratings to nearest 0.5
		allCleaners = averageCleanerRatings(allCleaners, true);
		
		allCleaners.forEach(cleaner => {
			if (cleaner.rating >= 4) {
				bestCleaners[0].push(cleaner);
			} else if (cleaner.rating >= 3) {
				bestCleaners[1].push(cleaner);
			}	else if (cleaner.rating >= 2) {
				bestCleaners[2].push(cleaner);
			}
		});
		res.status(200).json(bestCleaners);
	});
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

export default app;
