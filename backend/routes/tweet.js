const router = require('express').Router();
const tweetController = require('../controllers/tweetController');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { paramValidatorMiddleware } = require('../middleware/paramValidators');

router
    .get('/home/:offset', tweetController.getHomeTweets)
    .get('/:id', paramValidatorMiddleware('bson','id'), tweetController.getTweet)
    .post('/', authMiddleware, tweetController.postTweet)
    .put('/like/:id', paramValidatorMiddleware('bson','id'), authMiddleware, tweetController.likeTweet)
    .get('/replies/:id', paramValidatorMiddleware('bson','id'), tweetController.getReplies)
    .get('/user/:id', paramValidatorMiddleware('bson','id'), tweetController.getUserTweets)
    .get('/like/:userId/:tweetId', paramValidatorMiddleware('bson','id'), tweetController.likeTweet)
    // .delete('/:id',tweetController.deleteTweet)

module.exports = router; 