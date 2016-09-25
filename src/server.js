import path from 'path';
import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const cleanersRouter = express.Router();

cleanersRouter.get('/nearby/:latitude/:longitude', (req, res) => {
	fs.readFile(path.join(__dirname, '../src/database/database.json'), 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		res.status(200).json(data);
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
