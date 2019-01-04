var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var path = require('path');
var Promise = require('promise');
const passport = require('passport');
const session = require('express-session');
var app = express()

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) 

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mongoose Connection 
mongoose.connect('', { useNewUrlParser: true })

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

//Show that our db is succesfully Connected
db.once('open', function(){
console.log("Connected to Mongo Lab: ");
})

//Set path for the Routes
var routes = require('./routes')(app);

//Setting the views
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("App is running on port " + port);
});