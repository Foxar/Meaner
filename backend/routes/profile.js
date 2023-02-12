const router = require('express').Router();
const profileController = require('../controllers/profileController');

router
    .get('/:id', profileController.getProfileById)
    .get('/user/:id', profileController.getProfileByUserId)

module.exports = router;