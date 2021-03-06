const { StatusCodes } = require('http-status-codes');
const errorConstructor = require('../utils/errorConstructor.function');

const validateUser = (req, _res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Name" is required'));
  }
  if (!email) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Email" is required'));
  }
  if (!password) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Password" is required'));
  }
  if (name.length < 3) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Name" have must be more to 3 characters'));
  }
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
};

module.exports = {
  validateUser,
};
