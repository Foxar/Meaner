const router = require('express').Router();
const tweetController = require('../../controllers/tweetController');

router
    .get('/:id', tweetController.getProfileById)
    .get('/user/:id', tweetController.getProfileByUserId)

module.exports = router;