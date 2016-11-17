import twitterAPIClient from 'twitter-node-client';
import twitterConfig from '../config/twitterAuthConfig.json';
import TweetsFactory from '../lib/utils/TweetsFactory.js';

var twitterApiSuccess = function(errorCB, successCB, response) {
	let jsonResp = JSON.parse(response);
	try {
		let parsedTweets = TweetsFactory.build(jsonResp);
		successCB(parsedTweets);
	} catch(exception) {
		console.log("Exception occured in parsing tweets: ", exception);
		errorCB(exception);
	}
}

class TwitterAPI {
	constructor() {
		let Twitter = twitterAPIClient.Twitter;
		this.twitter = new Twitter({
		    "consumerKey": twitterConfig.consumerKey,
		    "consumerSecret": twitterConfig.consumerSecretKey,
		    "accessToken": twitterConfig.applicationToken,
		    "accessTokenSecret": twitterConfig.applicationTokenSecretKey,
		    "callBackUrl": twitterConfig.callBackUrl
		});
		twitterApiSuccess.bind(this);
	}
	getUserTimeline(twitterHandle, tweetCount, errorCB, successCB) {
		if(!successCB || !errorCB) {
			throw new Error("Need to supply a success and an error callback");
		} else {
			this.twitter.getUserTimeline({ screen_name: twitterHandle, count: tweetCount}, (err) => {
				console.log(err);
			}, (resp) => {
				twitterApiSuccess.call(this, errorCB, successCB, resp);
			});
		}
	}
}

export default TwitterAPI;