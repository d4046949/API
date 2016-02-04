var EventEmitter = require('events').EventEmitter,
    express = require('express');


var ApiService = module.exports = function () {
    var app = express();
    var self = this;

    app.get('/api/getInfo', function (req, res) {
        self.emit('retrieve-info', function () {
            res.end('info obtained');
        });
    });

    this.start = function () {
        app.listen(5001);
    };
};

ApiService.prototype = Object.create(EventEmitter.prototype);
