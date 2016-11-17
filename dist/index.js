'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tweets = require('./api/tweets.js');

var _tweets2 = _interopRequireDefault(_tweets);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _appConfig = require('./config/appConfig.json');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _cors2.default)({
	exposedHeaders: _appConfig2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
	limit: _appConfig2.default.bodyLimit
}));

exports.default = app;
//# sourceMappingURL=index.js.map