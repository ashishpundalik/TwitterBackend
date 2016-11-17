'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _twitterNodeClient = require('twitter-node-client');

var _twitterNodeClient2 = _interopRequireDefault(_twitterNodeClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	return resource({
		id: 'tweets',
		getUserTimeline: function getUserTimeline() {
			return _twitterNodeClient2.default;
		}
	});
};
//# sourceMappingURL=tweets.js.map