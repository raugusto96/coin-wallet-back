const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();

const { SECRET_KEY } = process.env;
const { FIRST_COLLECTION_NAME } = process.env;

const jwtOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const createUser = async (item) => {
  const user = await models.user.createUser(FIRST_COLLECTION_NAME, item);
  const { name, email, _id } = user;
  return { name, email, _id };
};

const logIn = async (item) => {
  const user = await models.user.logIn(FIRST_COLLECTION_NAME, item);
  if (!user) {
    return { message: 'Email or password do not match' };
  }
  const {
    name, email, _id,
  } = user;
  const token = jwt.sign({
    name, email, _id,
  }, SECRET_KEY, jwtOptions);
  return token;
};

module.exports = {
  createUser,
  logIn,
};
