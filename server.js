const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var methodOver = require('method-override');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// var configDB = require('./config/database.js');

// mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());

app.set('views', __dirname + '/views');
// app.use("/", express.static(__dirname + '/public'));
app.use(methodOver('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'html');

app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require('./app/routes.js')(app, passport);

app.listen(port);
console.log('server running its services in port', port);
