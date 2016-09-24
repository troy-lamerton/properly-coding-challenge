'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

var cleanersRouter = _express2.default.Router();

cleanersRouter.get('/nearby/:latitude/:longitude', function (req, res) {
	res.status(200).send();
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