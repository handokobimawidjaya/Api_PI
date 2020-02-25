'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sensorSchema = mongoose.Schema({ 

	
	status				: String,
	hari				: String,
	nilai				: String,

});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/node-login');
mongoose.connect('mongodb://sva:svaDB213@dbmongo.server.pptik.id:27017/svaDB');

module.exports = mongoose.model('kelembapans', sensorSchema);