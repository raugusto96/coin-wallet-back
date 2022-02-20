const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');

module.exports = {
  validateName: user.validateName,
  validateEmail: user.validateEmail,
  validatePassword: user.validatePassword,
  validateToken: token,
};
