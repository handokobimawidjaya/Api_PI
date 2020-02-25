const map = require('../models/map');

exports.getMap = () => 

	new Promise((resolve,reject) => {

		map.find({})

		.then(users => resolve(users))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});