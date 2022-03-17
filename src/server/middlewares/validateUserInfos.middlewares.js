const { StatusCodes } = require('http-status-codes');
const errorConstructor = require('../utils/errorConstructor.function');

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (name.length < 3) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Name" have must be more to 3 characters'));
  }
  const emailRegex = /\S+@\S+\.\S+/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Email" is not valid'));
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const isValidPassword = passwordRegex.test(password);
  if (!isValidPassword) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Password" is not valid'));
  }
  next();
  return true;
};

module.exports = {
  validateUser,
};
