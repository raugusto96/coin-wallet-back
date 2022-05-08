const { StatusCodes } = require('http-status-codes');
const errorConstructor = require('../utils/errorConstructor.function');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Email" is required"'));
  };
  if (!password) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Password" is required"'));
  };
  const emailRegex = /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}\S$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Email" is not valid'));
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const isValidPassword = passwordRegex.test(password);
  if (!isValidPassword) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Password" is not valid'));
  }
  return next();
}

module.exports = validateLogin;