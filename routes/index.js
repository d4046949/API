var express = require('express');
var dash = require("bitcoin");
var router = express.Router();

var client = new dash.Client({
  host: 'localhost',
  port: 9998,
  user: 'dashrpc',
  pass: '71PXiDZoHNfEdhdN3urucLVAUWYyzNHNeBMdkGf6483f',
  timeout: 30000
});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Dash RPC' });

});

router.get('/api/getInfo', function(req, res, next) {
  client.getInfo(function(err, info, resHeaders) {
    if (err) return console.log(err);

    res.json(info);

  });
});

router.get('/api/getInfo/:attribute', function(req, res, next) {
  client.getInfo(function(err, info, resHeaders) {
    if (err) return console.log(err);

    var key = req.params.attribute; // get requested JSON key
    res.render('layout', { title: 'Dash RPC', key: key, data: info[key] });

  });
});

module.exports = router;