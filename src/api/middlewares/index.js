const user = require('./validateUserInfos.middlewares');
const token = require('./validateToken');

module.exports = {
  user,
  validateToken: token,
};
