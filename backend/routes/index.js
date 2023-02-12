const router = require('express').Router();

const tweetRoutes = require('./tweet');
const profileRoutes = require('./profile');
const authRoutes = require('./auth');

router
    .use('/tweets', tweetRoutes)
    .use('/profile',profileRoutes)
    .use('/auth', authRoutes)

module.exports = router;