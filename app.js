var express = require('express'),
    logger = require('./logger'),
    ApiService = require('./ApiService'),
    async = require('async'),
    dash = require("bitcoin");
   

logger.info('app starting up');

// var client = new dash.Client({
//   host: 'localhost',
//   port: 9998,
//   user: 'dashrpc',
//   pass: '71PXiDZoHNfEdhdN3urucLVAUWYyzNHNeBMdkGf6483f',
//   timeout: 30000
// });

async.waterfall([
    function initializeReceiverService(next) {
            next(null);
        },
    function initializeApiService(next) {
        var apiService = new ApiService();
        apiService.start();

        logger.info('api service setup');
        next(null, apiService);
    },
    function initializeDispatcherService(apiService, next) {
        logger.info('starting dispatcher service');
        next();
    }
], function (err) {
    if (err) {
        logger.error('could not start app: ', err);
        process.kill();
        return;
    }

    logger.info('app is online');
});


// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// 
// var routes = require('./routes/index');
// 
// var app = express();
// 
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// 
// app.use('/', routes);
// 
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// 
// // error handlers
// 
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     console.log('test');
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
// 
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
// 
// console.log('test');
// 
// module.exports = app;
