const router = require('express').Router();
const profileController = require('../controllers/profileController');
const { authMiddleware } = require('../middleware/auth');
const { paramValidatorMiddleware } = require('../middleware/paramValidators');

router
    .get('/:id', paramValidatorMiddleware('bson','id'), profileController.getProfileById)
    .get('/user/:id',paramValidatorMiddleware('bson','id'), profileController.getProfileByUserId)
    .put('/:id', authMiddleware, paramValidatorMiddleware('bson', 'id'), profileController.putEditProfileById)

module.exports = router;