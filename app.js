// Dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// MongoDB connection
mongoose.Promise = global.Promise;
const MONGODB = 'mongodb://localhost/sfmovies2';
mongoose.connect(MONGODB)
	.then(function(con) {
		console.log("Successfully connected to Database");
	})
	.catch(function(err) {
		console.log("error connecting Database", err.message)
	})

require('./cron')();//for populating db on a regular time interval

// Middlewares setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Routes
const index = require('./routes/index');
app.use('/', index);

module.exports = app;
