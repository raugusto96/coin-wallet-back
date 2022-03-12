const jwt = require('jsonwebtoken');
const md5 = require('md5');
const models = require('../models');
require('dotenv').config();
const middlewares = require('../middlewares');
const errorConstructor = require('../utils/errorConstructor.function');

const { SECRET_KEY, FIRST_COLLECTION_NAME } = process.env;

const jwtOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const findByEmail = async (email) => {
  const user = await models.user.findByEmail(FIRST_COLLECTION_NAME, email);
  if (user !== null) throw errorConstructor('User already registered');
  return false;
};

const createUser = async (item) => {
  const isValidName = middlewares.validateName(item.name);
  if (isValidName.error) return isValidName;
  const isValidEmail = middlewares.validateEmail(item.email);
  if (isValidEmail.error) return isValidEmail;
  const isValidPassword = middlewares.validatePassword(item.password);
  if (isValidPassword.error) return isValidPassword;
  const isEmailExists = await findByEmail(item.email);
  if (isEmailExists.error) return isEmailExists;
  const newUser = { ...item, password: md5(item.password) };
  const user = await models.user.createUser(FIRST_COLLECTION_NAME, newUser);
  const { name, email, _id } = user;
  return { name, email, _id };
};

const logIn = async (item) => {
  const user = await models.user.logIn(FIRST_COLLECTION_NAME, item);
  console.log(user);
  if (!user) {
    throw errorConstructor('Email or password do not match');
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
  findByEmail,
};
