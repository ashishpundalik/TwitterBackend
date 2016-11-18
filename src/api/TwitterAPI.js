import twitterAPIClient from 'twitter-node-client';
import twitterConfig from '../config/twitterAuthConfig.json';
import TweetsFactory from '../lib/utils/TweetsFactory.js';

var twitterApiSuccess = function(errorCB, successCB, response) {
	try {
		let parsedTweets = TweetsFactory.build(response);
		console.log(response);
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
				let jsonResp = JSON.parse(resp);
				twitterApiSuccess.call(this, errorCB, successCB, jsonResp);
			});
		}
	}
	searchTweets(twitterHashtag, tweetCount, errorCB, successCB) {
		if(!successCB || !errorCB) {
			throw new Error("Need to supply a success and an error callback");
		} else {
			this.twitter.getSearch({ q: '#'+twitterHashtag, count: tweetCount}, (err) => {
				console.log(err);
			}, (resp) => {
				let jsonResp = JSON.parse(resp);
				if(jsonResp.statuses && jsonResp.statuses.length > 0) {
					twitterApiSuccess.call(this, errorCB, successCB, jsonResp.statuses);
				} else {
					errorCB("Something went wrong");
				}
			});
		}
	}
}

export default TwitterAPI;