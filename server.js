// Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    exphbs = require('express-handlebars'),
    flash = require('connect-flash'),
    http = require('http'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    path = require('path');

// Configuring Express
var app = express();

app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
//Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(logger('combined'));
app.use(cookieParser());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname + 'public')));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/app', express.static(__dirname + '/app'));

// Routes
require('./routes/routes')(app);

// Start Server

app.listen(3000);
console.log('Server running at localhost:3000.');
