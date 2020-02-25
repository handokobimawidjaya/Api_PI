'use strict';

const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;
// const dataNutrisi = require('./routes/routes');

app.use(bodyParser.urlencoded({
	enableTypes:['json','form'],extended:
	false
}))
app.use(logger('dev'));

require('./routes/routes')(router);
app.use('/', router);
// app.get('/datanutrisi', dataNutrisi.viewAllData);
// app.get('/inputdata', dataNutrisi.inputDataNutrisi);

app.listen(port);

console.log(`App Runs on ${port}`);