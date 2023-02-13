const router = require('express').Router();
const profileController = require('../controllers/profileController');
const { paramValidatorMiddleware } = require('../middleware/paramValidators');

router
    .get('/:id', profileController.getProfileById)
    .get('/user/:id',paramValidatorMiddleware('bson','id'), profileController.getProfileByUserId)

module.exports = router;