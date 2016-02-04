var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    ApiHandler = require('./ApiHandler');


var ApiService = module.exports = function () {
    var app = express();
    var self = this;

    var apiHandler = new ApiHandler(this);
    app.get('/api/getInfo', function (req, res) {
        console.log('get info called');
        self.emit('retrieve-info', function () {
            res.end('info obtained');
        });
    });

    this.start = function () {
        app.listen(5000);
    };
};

ApiService.prototype = Object.create(EventEmitter.prototype);
