I have used [BoyCook's Twitter JS Client for authentication](https://github.com/BoyCook/TwitterJSClient)

### Installation

TwitterBackend requires [Node.js](https://nodejs.org/) v4+ to run.

Clone the repo https://github.com/ashishpundalik/TwitterBackend.git

Install the dependencies and devDependencies.

```sh
$ cd TwitterBackend
$ npm install
```

### Application configuration.

In order to Authenticate the application with Twitter you need to provide the details in the config mentioned below:
```sh
$ cd app/js/config
```
Edit the twitterAuthConfig.json file and provide the correct values of consumerKey, consumerSecretKey,
applicationToken, applicationTokenSecretKey and callbackURL which you will find in your created application's "Keys and Access Tokens" tab.
```json
{
	"consumerKey": "your consumer key",
	"consumerSecretKey": "consumer secret key",
	"applicationToken": "generated application token",
	"applicationTokenSecretKey": "secret key for the generated application token",
	"callBackUrl": "callback url"
}
```

### Running the application

I usually prefer [nodemon](https://www.npmjs.com/package/nodemon) to run my node servers.
You can have nodemon installed with a -g option or have it installed locally. I have added it as a devDependency, in case anyone decides to install it locally.

```sh
$ cd app/js/
$ nodemon ./server.js localhost 8080
```

### API documentation:

  - /api/user/tweets: Retrieves the tweets of the mentioned twitterHandle.
    - params:
    ```json
    {
      "twitterHandle": "Srbachchan",
      "tweetCount": 10
    }
    ```
  - /api/user: Retrieves your own tweets, in this case the account with which you have created the TwitterApp.
    - params:
    ```json
    {
      "tweetCount": 10
    }
    ```
  - /api/search: Retrieves tweets relevant to the hashtag value mentioned in the request
    - params:
    ```json
    {
      "hashtag": "trump",
      "tweetCount": 10
    }
    ```
