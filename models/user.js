'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	name 			: String,
	name2			: String,
	nomor			: Number,
	alamat			: String,
	email			: String,
	macSensor		: String,
	macRelay		: String,
	hashed_password	: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String

});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sva:svaDB213@dbmongo.server.pptik.id:27017/svaDB');
//mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('user', userSchema);