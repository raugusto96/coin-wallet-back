const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/users', middlewares.user.validateUser, controllers.user.createUser);
router.post('/login', controllers.user.logIn);
router.get('/user/:nickname', middlewares.validateToken, controllers.user.getByNickname);

module.exports = router;
