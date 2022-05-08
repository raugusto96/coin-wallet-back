const errorConstructor = require('../utils/errorConstructor.function');
const { StatusCodes } = require('http-status-codes');

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  if (!email) return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Email" is required'));
  const emailRegex = /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}\S$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Email" is not valid'));
  }
  next();
};

module.exports = validateEmail;