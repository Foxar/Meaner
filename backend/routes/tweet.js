const router = require('express').Router();
const tweetController = require('../controllers/tweetController');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

router
    .get('/home/:offset', tweetController.getHomeTweets)
    .get('/:id', tweetController.getTweet)
    .post('/', authMiddleware, tweetController.postTweet)
    .put('/like/:id', authMiddleware, tweetController.likeTweet)
    .get('/replies/:id', tweetController.getReplies)
    .get('/user/:id', tweetController.getUserTweets)
    .get('/like/:userId/:tweetId', tweetController.likeTweet)
    // .delete('/:id',tweetController.deleteTweet)

module.exports = router; 