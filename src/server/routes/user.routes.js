const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/register', middlewares.user.validateUser, controllers.user.createUser);
router.post('/login', controllers.user.logIn);
router.get('/user/:id', middlewares.validateToken, controllers.user.findById);
router.delete('/user/:id', middlewares.validateToken, controllers.user.deleteById);
router.post('/reset-password', middlewares.validateToken, controllers.user.resetPassword);

module.exports = router;
