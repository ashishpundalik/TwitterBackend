import TwitterAPI from './api/TwitterAPI.js'
import express from 'express';
import http from 'http';
import config from './config/appConfig.json';
import cors from 'cors';
import bodyParser from 'body-parser';

let app = express();

let router = express.Router();

app.server = http.createServer(app);

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/api', router);

router.get('/user', (req, res) => {
	new TwitterAPI().getUserTimeline(req.query.twitterHandle, req.query.tweetCount, (err) => {
		console.log(err);
	}, (resp) => {
		res.send(resp);
	});	
});

app.listen(8080, function() {
	console.log('Application started on port 8080!');
})

export default app;