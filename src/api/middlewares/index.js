const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');
const mailer = require('./nodemailer.middlewares');

module.exports = {
  user,
  validateToken: token,
  mailer,
};
