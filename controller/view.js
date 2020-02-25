'use strict';

const sensor = require('../models/sensor');

exports.getSensor = () => 

	new Promise((resolve,reject) => {

		sensor.find({})

		.then(users => resolve(users))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
	

exports.createSensor = () => 

	new Promise((resolve,reject) => {

		const newSensor = new sensor({


			status: "name",
			tanggal	: "email",
			hari: "hash",
			nilai: new Date()
			
		});

		newSensor.save()

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});