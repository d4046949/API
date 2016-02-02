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

  res.render('home'); // route to testing "chat" page

});

router.get('/api/dapi_command/addr/from_uid/:from_uid/to_uid/:to_uid/signature/:signature/payload/:payload', function(req, res, next) { // should we consider using POST? https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
  var obj = new Object;
  obj.object = "dapi_command";
  obj.data = new Object;
  obj.data.command = "message";
  obj.data.subcommand = "addr";
  obj.data.from_uid = req.params.from_uid; // snogcel
  obj.data.to_uid = req.params.to_uid; // other user
  obj.data.signature = req.params.signature; // ??
  obj.data.payload = req.params.payload; // ENCRYPTED

  client.dapi(JSON.stringify(obj), function(err, info, resHeaders) {
    if (err) return console.log(err);
    res.json(info); // server response
  });
});

// from electrum-dash evolution: {"object": "dapi_command", "data": {"slot": 1, "command": "get_profile", "id": "2627738", "to_uid": "snogcel", "from_uid": "snogcel"}}
router.get('/api/dapi_command/get_profile/from_uid/:from_uid/to_uid/:to_uid/id/:id/slot/:slot', function(req, res, next) { // should we consider using POST? https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
  var obj = new Object;
  obj.object = "dapi_command";
  obj.data = new Object;
  obj.data.command = "get_profile";
  obj.data.from_uid = req.params.from_uid; // snogcel
  obj.data.to_uid = req.params.to_uid; // snogcel
  obj.data.id = req.params.id; // 2627738 (according to python this is random generated)
  obj.data.slot = req.params.slot; // 1

  client.dapi(JSON.stringify(obj), function(err, info, resHeaders) {
    if (err) return console.log(err);
    res.json(info); // server response
  });
}); // causes dashd to crash if called -- requires websocket connection (apparently)

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