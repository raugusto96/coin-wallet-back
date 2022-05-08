const errorConstructor = require('../utils/errorConstructor.function');
const { StatusCodes } = require('http-status-codes');

const validatePassword = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Password" is required'));
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const isValidPassword = passwordRegex.test(password);
  if (!isValidPassword) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Password" is not valid'));
  }
  next();
}

module.exports = validatePassword;