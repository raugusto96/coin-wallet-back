const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();

const { SECRET_KEY } = process.env;
const { FIRST_COLLECTION_NAME } = process.env;

const logIn = async (item) => {
  const user = await models.user.logIn(FIRST_COLLECTION_NAME, item);
  if (!user) {
    return { message: 'Email or password do not match' };
  }
  const {
    name, area, _id, role,
  } = user;
  const token = jwt.sign({
    name, area, _id, role,
  }, SECRET_KEY);
  return token;
};

module.exports = {
  logIn,
};
