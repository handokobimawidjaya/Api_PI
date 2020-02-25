'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../controller/register');
const login = require('../controller/login');
const profile = require('../controller/profile');
const sensor = require('../controller/view');
const map = require('../controller/map');
const password = require('../controller/password');
const config = require('../config/config.json');
var usercontroller = require('../controller/usercontroller')

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to Learn2Crack !'));

	router.post('/users/login', (req, res) => {
		const credentials = auth(req);
		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

				res.status(result.status).json({ success: true, 
					message: result.message, 
					name:result.name, 
					name2:result.name2,
					macSensor:result.macSensor, 
					token: token });

			})

			.catch(err => res.json({ success: false, message: "User name atau password salah" }));
		}
	});

	router.get('/data', (req,res) => {

			sensor.getSensor()

			.then(result => res.json({result :result}))	

			.catch(err => res.status(err.status).json({ message: err.message }));
		
	});

	router.get('/map', (req,res) => {

			map.getMap()

			.then(result => res.json({result: result}))	

			.catch(err => res.status(err.status).json({ message: err.message }));
		
	});

	router.post('/data/create', (req,res) => {

			sensor.createSensor()

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));		
	});

	router.post('/users/register', (req, res) => {

		const name = req.body.name;
		const name2 = req.body.name2;
		const nomor = req.body.nomor;
		const alamat = req.body.alamat;
		const email = req.body.email;
		const macSensor = req.body.macSensor;
		const macRelay = req.body.macRelay;
		const password = req.body.password;
		if (!name || !name2 || !nomor || !alamat || !email || !macSensor || !macRelay || !password || !name.trim() || !name2.trim() || !nomor.trim() || !alamat.trim() || !email.trim() || !macSensor.trim() || !macRelay.trim() || !password.trim()) {

			res.json({success:false,message: email});

		} else {

			register.registerUser(name, name2, nomor, alamat, email, macSensor, macRelay, password)

			.then(result => {

				
				res.json({ success: true, message: result.message })
			})

			.catch(err => res.json({ success: false, message: "Data gagal tersimpan" }));
		}
	});

	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}
}
