import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const cleanersRouter = express.Router();

cleanersRouter.get('/nearby', function (req, res) {
	console.log('/cleaners/nearby');
	res.status(202).end();
});

cleanersRouter.get('/best', function (req, res) {
	console.log('/cleaners/best');
	res.status(202).end();
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});


if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

export default app;
