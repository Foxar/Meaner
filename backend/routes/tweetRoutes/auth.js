const router = require('express').Router();
const authController = require('../../controllers/authController');

router
    .post('/login',authController.postLogin)
    .get('/validateToken', authController.validateToken)
    .post('/changePassword', authController.changePassword)

module.exports = router;