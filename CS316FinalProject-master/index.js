// *** main dependencies *** //
'use strict';
const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors');
//var router = express.Router();
const db = require('./server/config/db.js');
const env = require('./server/config/env');
const router = require('./server/router/index');

const app = express();
const PORT = process.env.PORT || 3000;

//*** view engine *** //
 var swig = require('swig');
 app.engine('html', swig.renderFile);
 app.set('view engine', 'html');

// //*** static directory *** //
 app.set('views', path.join(__dirname, 'public'));
//  app.get('/', function(req, res){
//     res.render("index.html");
// });


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('combined'));
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});
router(app, db);

// router.get('/', (req, res) => {
// 	//res.sendFile('server/views/index.html', { root: "/Users/wenqinwang/Desktop/CS316/project" });
//   res.sendFile('index.html');
//   //res.render('index', { title: 'Home Page' });
// });

// *** main routes *** //
//app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //
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

db.sequelize.sync();
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});

module.exports = app;
