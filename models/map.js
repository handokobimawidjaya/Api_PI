'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mapSchema = mongoose.Schema({ 

	
	longitude				: String,
	latitude				: String,

});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/svaDB');
//mongoose.connect('mongodb://sva:svaDB213@dbmongo.server.pptik.id:27017/svaDB');

module.exports = mongoose.model('maps', mapSchema);