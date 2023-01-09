const router = require('express').Router();

const tweetRoutes = require('./tweetRoutes/tweet');
const profileRoutes = require('./tweetRoutes/profile');
const authRoutes = require('./tweetRoutes/auth');

router
    .use('/tweets', tweetRoutes)
    .use('/profile',profileRoutes)
    .use('/auth', authRoutes)

module.exports = router;