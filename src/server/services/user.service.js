const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');
const verifyPassword = require('../utils/verifyPassword.function');

const { SECRET_KEY, FIRST_COLLECTION_NAME } = process.env;

const saltRounds = 10;

const jwtOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const findByNickname = async (nickname) => {
  const user = await models.user.findByNickname(FIRST_COLLECTION_NAME, nickname);
  if (user !== null) return true;
  return false;
};

const getByNickname = async (nickname) => {
  const user = await models.user.getByNickname(FIRST_COLLECTION_NAME, nickname);
  if (!user) {
    throw errorConstructor('Nickname doesn\'t exists');
  }
  const {
    _id, email, name, nickname: userNickname,
  } = user;
  return {
    _id, email, name, userNickname,
  };
};

const findByEmail = async (email) => {
  const user = await models.user.findByEmail(FIRST_COLLECTION_NAME, email);
  if (user !== null) return true;
  return false;
};

const createUser = async (item) => {
  const isUserRegistered = await findByEmail(item.email);
  if (isUserRegistered) {
    throw errorConstructor('User already registered!');
  }
  const isNicknameExists = await findByNickname(item.nickname);
  if (isNicknameExists) {
    throw errorConstructor('Nickname already exists!');
  }
  const hash = bcrypt.hashSync(item.password, saltRounds);
  const newUser = { ...item, password: hash };
  const user = await models.user.createUser(FIRST_COLLECTION_NAME, newUser);
  const {
    name, email, _id, nickname,
  } = user;
  return {
    name, email, _id, nickname,
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
  getByNickname,
  findByNickname,
};
