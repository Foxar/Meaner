const router = require('express').Router();
const authController = require('../controllers/authController');

router
    .post('/signup', authController.postSignup)
    .post('/login',authController.postLogin)
    .post('/validateToken', authController.postValidateToken)
    .post('/changePassword', authController.postChangePassword)

module.exports = router;