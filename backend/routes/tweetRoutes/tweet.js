const router = require('express').Router();
const tweetController = require('../../controllers/tweetController');
const authController = require('../../controllers/authController');

router
    .get('/home/:offset', tweetController.getHomeTweets)
    .get('/:id', tweetController.getTweet)
    .post('/', authController.authMiddleware, tweetController.postTweet)
    .get('/replies/:id', tweetController.getReplies)
    .get('/user/:id', tweetController.getUserTweets)
    // .delete('/:id',tweetController.deleteTweet)

module.exports = router;