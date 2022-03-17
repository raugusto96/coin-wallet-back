const bcrypt = require('bcrypt');

const verifyPassword = (password, hash) => {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

module.exports = verifyPassword;
