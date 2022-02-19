const router = require('express').Router();
const controllers = require('../controllers');

router.post('/users', controllers.user.createUser);
router.post('/login', controllers.user.logIn);

module.exports = router;
