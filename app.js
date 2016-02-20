var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    Firebase = require('firebase'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    favicon = require('serve-favicon'),
    http = require('http'),
    logger = require('morgan'),
    path = require('path');


// Initalize express
var app = express();

var home = require('./routes/index'),
    users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /app
//app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'app'),
  dest: path.join(__dirname, 'app'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname + 'app')));
app.use(express.static(path.join(__dirname, 'app')));
app.use('/app', express.static(__dirname + '/app'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.set('port', process.env.PORT || 3000);

//Pass the 'app' Object to each view

//Add reference routes file to each URI
app.use('/', home);
app.use('/users', users);

var hbs = exphbs.create({
  defaultLayout: 'index'
});


// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function (req, res) {
  console.log('Server running at localhost: ' + app.get('port'));
});
