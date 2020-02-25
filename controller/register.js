'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (name, name2, nomor, alamat, email, macSensor, macRelay, password) => 

	new Promise((resolve,reject) => {

	    const salt    = bcrypt.genSaltSync(10);
		const hash 	  = bcrypt.hashSync(password, salt);

		const newUser = new user({

			name: name,
			name2: name2,
			nomor: nomor,
			alamat: alamat,
			email: email,
			macSensor : macSensor,
			macRelay : macRelay,
			hashed_password: hash,
			created_at: new Date()
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});