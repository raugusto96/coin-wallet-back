const user = require('./validateUserInfos.middlewares');

module.exports = {
  validateName: user.validateName,
  validateEmail: user.validateEmail,
  validatePassword: user.validatePassword,
};
