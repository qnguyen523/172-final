/**
Name: Quoc Nguyen
Class: CMPE/SE 172
Final Coding
*/
var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');  
var morgan = require('morgan');
var bodyParser = require('body-parser');
// connect to mongoDB database 
mongoose.connect(config.db.url);
//Set - up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 // var db = mongoose.connection;
// var dbCollection = db.collections;


//In a large application, 
//things could easily get out of control 
//if we keep adding code to a single 
//JavaScript file (server.js).
// So  move the routes-related code 
//into  api module .
app.use('/api/', api);

module.exports = app;
