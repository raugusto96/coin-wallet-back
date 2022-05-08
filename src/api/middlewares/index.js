const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');
const expense = require('./validateExpenseData.middlewares');
const error = require('./error.middleware');
const login = require('./validateLogin.middlewares');
const email = require('./validateEmail.middleware');

module.exports = {
  user,
  validateToken: token,
  expense,
  error,
  login,
  email,
};
