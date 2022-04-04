const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');
const expense = require('./validateExpenseData.middlewares');
const mailer = require('./nodemailer.middlewares');
const error = require('./error.middleware');

module.exports = {
  user,
  validateToken: token,
  mailer,
  expense,
  error,
};
