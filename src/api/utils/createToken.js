const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const jwtOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};


const createToken = (user) => {
  const { name, email, id } = user;
  const token = jwt.sign({
    name, email, id,
  }, SECRET_KEY, jwtOptions);
  return token;
};

module.exports = createToken;