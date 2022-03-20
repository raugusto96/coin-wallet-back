const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');
const expense = require('./validateExpenseData.middlewares');
const mailer = require('./nodemailer.middlewares');

module.exports = {
  user,
  validateToken: token,
  mailer,
  expense,
};
