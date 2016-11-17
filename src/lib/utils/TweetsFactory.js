import TweetParser from './TweetParser.js'

class TweetsFactory {
	static build(tweets) {
		let parsedTweets = new Array();
		if(Array.isArray(tweets)) {
			for(var i = 0; i < tweets.length; i++) {
				parsedTweets.push(new TweetParser(tweets[i]).parse());
			}
		}
		return parsedTweets;
	}
}

export default TweetsFactory;