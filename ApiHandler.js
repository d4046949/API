var EventEmitter = require('events').EventEmitter,
    logger = require('./logger'),
    express = require('express');

module.exports = function (apiService) {
    
 apiService.on('retrieve-info',function(onCompleteCallback){
    logger.info('do some processing for retrieve Info and pass back result');
    onCompleteCallback();
 });
};
