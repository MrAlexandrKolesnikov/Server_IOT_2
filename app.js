var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var index = require('./routes/index');
var auth = require('./routes/auth');
var registration = require('./routes/registration');
var temperature = require('./routes/temperature');
var friday = require('./routes/friday');
var remout = require('./routes/remout');
var post = require('./routes/post_test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bot')));
app.use(express.static(path.join(__dirname, 'bin')));
app.use(session({
    secret: 'i need more beers',
    resave: false,
    saveUninitialized: false,
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: new MongoStore({
        url: 'mongodb://root:12345@ds151452.mlab.com:51452/server_iot_db',
    })
}));

app.use('/', index);
app.use('/auth', auth);
app.use('/registration',registration);
app.use('/temperature',temperature);
app.use('/friday',friday);
app.use('/remout',remout);
app.use('/post',post);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
