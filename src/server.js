import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const cleanersRouter = express.Router();

cleanersRouter.get('/nearby/:latitude/:longitude', function (req, res) {
	console.log('/cleaners/nearby');
	console.log('params', req.params);
	res.status(202).send();
});

cleanersRouter.get('/best', function (req, res) {
	console.log('/cleaners/best');
	res.status(202).send();
});

app.use('/cleaners', cleanersRouter);

app.use(function render(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

if (module && !module.parent) {
	app.listen(process.env.PORT || 4000);
}

export default app;
