import NoTweetsException from '../exceptions/NoTweetsException.js'

class TweetParser {
	constructor(Tweet) {
		this.tweet = Tweet;
	}

	parse() {
		if(this.tweet) {
			return {
				"tweet": this.tweet.text,
				"user": this.tweet.user.name,
				"handle": this.tweet.user.screen_name,
				"location": this.tweet.user.location
			}
		}
		throw new NoTweetsException("EmptyTweet");
	}
}

export default TweetParser;