"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _sendevent = _interopRequireDefault(require("sendevent"));

var _ViewsBundler = _interopRequireDefault(require("./ViewsBundler"));

//Parcel Bundler wrapper
var viewsPath = _path.default.join(__dirname, '../dist/views');

var ENV = process.env.NODE_ENV;
var PORT = process.env.PORT || 8080;
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use('/', _express.default.static(_path.default.join(__dirname, '../dist/views')));
var events = (0, _sendevent.default)('/eventstream');
app.use(events);
/*function that is called when app is ended bundling*/

var ReloadApp = function ReloadApp(success, msg) {
  events.broadcast({
    msg: 'reload'
  });
  console.log('📦  App Bundled');
}; //execute bundler


var bundler = new _ViewsBundler.default(); //usual routers

app.get('/', function (req, res) {
  res.sendFile(_path.default.join(viewsPath, '/index.html'));
});
app.get('/home', function (req, res) {
  res.cookie('data', JSON.stringify({
    name: "lucas"
  }));
  res.sendFile(_path.default.join(viewsPath, '/home.html'));
});
app.listen(PORT, function () {
  console.log("\uD83D\uDE80 running @ port ".concat(PORT));

  if (ENV == 'development') {
    console.log("\u2615\uFE0F  ".concat(ENV, " -> Creating Front-end bundle"));
    bundler.runBundle(ReloadApp);
  } else {
    console.log("\uD83C\uDF7A  ".concat(ENV, " -> Building Front-end"));
    bundler.runBuild(function () {
      console.log('🚀  App Launched!');
    });
  }
});