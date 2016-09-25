import path from 'path';
import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const cleanersRouter = express.Router();

function cleanerIsNearby (myLocation, cleaner) {
	const withinDistance = 0.02;
	return Math.abs(myLocation.lat - cleaner.lat) < withinDistance &&
	Math.abs(myLocation.lng - cleaner.lng) < withinDistance;
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

		// remove location data and average the cleaners ratings
		const nearbyCleanersAveraged = nearbyCleaners.map(cleaner => {
			const editedCleaner = {
				name: cleaner.name
			};
			editedCleaner.rating = cleaner.ratings.reduce((sum, number) => {
				return sum + number;
			}) / cleaner.ratings.length;

			// round rating to nearest 0.5
			editedCleaner.rating = Math.round(editedCleaner.rating * 2) / 2;

			return editedCleaner;
		});

		// sort cleaners descending by rating
		nearbyCleanersAveraged.sort((a, b) => {
			return b.rating - a.rating;
		});

		res.status(200).json(nearbyCleanersAveraged);
	});
});

cleanersRouter.get('/best', (req, res) => {
	const data = [
		{name: "John Doe", rating: 4.5},
		{name: "Jane Doe", rating: 2.0},
		{name: "Tim Brown", rating: 4.2}
	];

	res.status(200).json(data);
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

export default app;
