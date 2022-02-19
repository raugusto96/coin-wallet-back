const router = require('express').Router();
const controllers = require('../controllers');

router.post('/login', controllers.user.logIn);

module.exports = router;
