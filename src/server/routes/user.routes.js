const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/register', middlewares.user.validateUser, controllers.user.createUser);
router.post('/login', controllers.user.logIn);
router.get('/user/:id', middlewares.validateToken, controllers.user.findById);
router.delete('/user/:id', middlewares.validateToken, controllers.user.deleteById);

module.exports = router;
