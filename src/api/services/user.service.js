const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');
const verifyPassword = require('../utils/verifyPassword.function');
const mailer = require('../utils/nodemailer.function');

const { SECRET_KEY, FIRST_COLLECTION_NAME, SALT_ROUNDS } = process.env;

const jwtOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const findById = async (id) => {
  const user = await models.user.findById(FIRST_COLLECTION_NAME, id);
  if (!user) {
    throw errorConstructor('User doesn\'t exist');
  }
  const { _id, email, name } = user;
  return { _id, email, name };
};

const deleteById = async (id) => {
  const findedUser = await findById(id);
  await models.user.deleteById(FIRST_COLLECTION_NAME, findedUser);
  return { status: 'deleted' };
};

const findByEmail = async (email) => {
  const user = await models.user.findByEmail(FIRST_COLLECTION_NAME, email);
  if (user !== null) return true;
  return false;
};

const resetPassword = async (email, name) => {
  const findedEmail = await findByEmail(email);
  if (!findedEmail) {
    throw errorConstructor('Email not registered!');
  }
  mailer(email, name);
};

const createUser = async (item) => {
  const isUserRegistered = await findByEmail(item.email);
  if (isUserRegistered) {
    throw errorConstructor('User already registered!');
  }
  const hash = bcrypt.hashSync(item.password, SALT_ROUNDS);
  const newUser = { ...item, password: hash };
  const user = await models.user.createUser(FIRST_COLLECTION_NAME, newUser);
  const {
    name, email, _id,
  } = user;
  return {
    name, email, _id,
  };
};

const logIn = async (item) => {
  const user = await models.user.logIn(FIRST_COLLECTION_NAME, item);
  if (!verifyPassword(item.password, user.password)) {
    throw errorConstructor('Email or password do not match');
  }
  if (!user) {
    throw errorConstructor('Email or password do not match');
  }
  const {
    name, email, _id, nickname,
  } = user;
  const token = jwt.sign({
    name, email, _id,
  }, SECRET_KEY, jwtOptions);
  return { token, nickname };
};

module.exports = {
  createUser,
  logIn,
  findByEmail,
  findById,
  deleteById,
  resetPassword,
};
