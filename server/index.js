
var config = require('./config');

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

mongoose.connect(config.urlDb, { useNewUrlParser: true })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 
app.use(bodyParser.json());

require('./routes.js')(app);

const port = process.env.PORT || config.PORT;
app.listen(port);
console.log("App listening on port " + port);
