"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Bundler = require('parcel-bundler');

var Path = require('path');

var ViewsBundler = function ViewsBundler(viewsDir, outFile, outDir) {
  var _this = this;

  (0, _classCallCheck2.default)(this, ViewsBundler);
  (0, _defineProperty2.default)(this, "runBundle",
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(callback) {
      var bundler, bundle;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              bundler = new Bundler(_this.entryFiles, _this.options); //checking if callback is a function

              callback = typeof callback == 'function' ? callback : null;
              bundler.on('buildEnd', function () {
                if (callback) callback(true);
              });
              bundler.on('buildError', function () {
                if (callback) callback(false);
              });
              _context.next = 6;
              return bundler.bundle();

            case 6:
              bundle = _context.sent;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "runBuild",
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(callback) {
      var entryFiles, options, bundler, bundle;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              entryFiles = Path.join(__dirname, '../views/*');
              options = {
                outDir: './dist/views/',
                // The out directory to put the build files in, defaults to dist
                outFile: 'index.html',
                // The name of the outputFile
                publicUrl: './',
                // The url to server on, defaults to dist
                watch: false,
                // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
                cache: false,
                // Enabled or disables caching, defaults to true
                contentHash: true,
                // Disable content hash from being included on the filename
                minify: true,
                // Minify files, enabled if process.env.NODE_ENV === 'production'
                scopeHoist: false,
                // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
                target: 'browser',
                // browser/node/electron, defaults to browser
                logLevel: 3,
                // 3 = log everything, 2 = log warnings & errors, 1 = log errors
                hmr: false,
                //Enable or disable HMR while watching
                hmrPort: 0,
                // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
                sourceMaps: true,
                // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
                hmrHostname: '',
                // A hostname for hot module reload, default to ''
                detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled

              };
              bundler = new Bundler(entryFiles, options);
              bundler.on('buildEnd', function () {
                if (callback) callback(true);
              });
              bundler.on('buildError', function () {
                if (callback) callback(false);
              });
              _context2.next = 7;
              return bundler.bundle();

            case 7:
              bundle = _context2.sent;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  this.entryFiles = Path.join(__dirname, viewsDir || '../views/*');
  console.log(this.entryFiles);
  this.options = {
    outDir: outDir || './dist/views/',
    // The out directory to put the build files in, defaults to dist
    outFile: outFile || 'index.html',
    // The name of the outputFile
    publicUrl: './',
    // The url to server on, defaults to dist
    watch: true,
    // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true,
    // Enabled or disables caching, defaults to true
    cacheDir: '.cache',
    // The directory cache gets put in, defaults to .cache
    contentHash: false,
    // Disable content hash from being included on the filename
    minify: false,
    // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false,
    // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser',
    // browser/node/electron, defaults to browser
    logLevel: 3,
    // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    hmr: true,
    //Enable or disable HMR while watching
    hmrPort: 0,
    // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: true,
    // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    hmrHostname: '',
    // A hostname for hot module reload, default to ''
    detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled

  };
};

exports.default = ViewsBundler;