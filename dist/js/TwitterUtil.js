'use strict';

var TwitterUtil = function () {
	"use strict";

	var twitterConfig = require('./config/twitterAuthConfig.json');
	var Twitter = require('twitter-node-client').Twitter;

	var CustomTweetFactory = require('./CustomTweetFactory.js');

	var errorCB, successCB;

	var isAdapterInitialized = false;

	var twitter = new Twitter({
		"consumerKey": twitterConfig.consumerKey,
		"consumerSecret": twitterConfig.consumerSecretKey,
		"accessToken": twitterConfig.applicationToken,
		"accessTokenSecret": twitterConfig.applicationTokenSecretKey,
		"callBackUrl": twitterConfig.callBackUrl
	});

	var getUserTimeline = function getUserTimeline(twitterHandle, tweetCount, errorCB, successCB) {
		if (!successCB || !errorCB) {
			throw new Error("Need to supply a success and an error callback");
		} else {
			console.log(twitterHandle, tweetCount);
			twitter.getUserTimeline({ screen_name: twitterHandle, count: tweetCount }, twitterAuthFailure.bind(this, errorCB), function (response) {
				var jsonResp = JSON.parse(response);
				twitterAuthSuccess.call(this, errorCB, successCB, jsonResp);
			});
		}
	};

	var getMyTweets = function getMyTweets(tweetCount, errorCB, successCB) {
		if (!successCB || !errorCB) {
			throw new Error("Need to supply a success and an error callback");
		} else {
			twitter.getReTweetsOfMe({ count: tweetCount }, twitterAuthFailure.bind(this, errorCB), function (response) {
				var jsonResp = JSON.parse(response);
				twitterAuthSuccess.call(this, errorCB, successCB, jsonResp);
			});
		}
	};

	var getSearchedTweets = function getSearchedTweets(hashtag, tweetsCount, errorCB, successCB) {
		if (!successCB || !errorCB) {
			throw new Error("Need to supply a success and an error callback");
		} else {
			twitter.getSearch({ 'q': "#" + hashtag, 'count': tweetsCount }, twitterAuthFailure.bind(this, errorCB), function (response) {
				var jsonResp = JSON.parse(response);
				twitterAuthSuccess.call(this, errorCB, successCB, jsonResp.statuses);
			});
		}
	};

	var twitterAuthSuccess = function twitterAuthSuccess(errorCB, successCB, response) {
		console.log("Response: ", response);
		try {
			var tweets = CustomTweetFactory.build(response);
			successCB(tweets);
		} catch (exception) {
			console.log("Exception occured in parsing tweets: ", exception);
			errorCB(exception);
		}
	};

	var twitterAuthFailure = function twitterAuthFailure(errorCB, error) {
		console.log("Failure calling twitter API: ", error);
		errorCB(error);
	};

	return { getUserTimeline: getUserTimeline, getMyTweets: getMyTweets, getSearchedTweets: getSearchedTweets };
}();

module.exports = TwitterUtil;
//# sourceMappingURL=TwitterUtil.js.map