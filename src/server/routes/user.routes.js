const router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.user.logIn);

module.exports = router;
