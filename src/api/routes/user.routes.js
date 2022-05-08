const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/register', middlewares.user.validateUser, controllers.user.createUser);
router.post('/login', middlewares.login, controllers.user.logIn);
router.get('/:id', middlewares.validateToken, controllers.user.findById);
router.delete('/:id', middlewares.validateToken, controllers.user.deleteById);
router.post('/reset-password', middlewares.email, controllers.user.sendEmail);
router.put('/:email/reset-password', middlewares.password,controllers.user.resetPassword);

module.exports = router;
