const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const models = require('../models');
const errorConstructor = require('../utils/errorConstructor.function');
const verifyPassword = require('../utils/verifyPassword.function');
const createToken = require('../utils/createToken');
const nodeMailer = require('../utils/nodemailer.function');

const { FIRST_COLLECTION_NAME, SALT_ROUNDS } = process.env;

const findById = async (id) => {
  const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
  if (!user) {
    throw errorConstructor(StatusCodes.NOT_FOUND, 'User doesn\'t exist');
  }
  const { userId, email, name } = user;
  return { email, name, userId };
};

const deleteById = async (id) => {
  const findedUser = await findById(id);
  await models.user.deleteById(FIRST_COLLECTION_NAME, findedUser);
};

const findByEmail = async (email) => {
  const user = await models.user.findByEmail(FIRST_COLLECTION_NAME, email);
  if (user !== null) return true;
  return false;
};

const sendEmail = async (email) => {
  const findedEmail = await findByEmail(email);
  if (!findedEmail) {
    throw errorConstructor(StatusCodes.NOT_FOUND, 'Email not registered!');
  }
  nodeMailer.sendMail(email);
};

const resetPassword = async (email, password) => {
  const hash = bcrypt.hashSync(password, Number(SALT_ROUNDS));
  await models.user.resetPassword(FIRST_COLLECTION_NAME, { email, password: hash });
};

const createUser = async (user) => {
  const isUserRegistered = await findByEmail(user.email);
  if (isUserRegistered) {
    throw errorConstructor(StatusCodes.CONFLICT, 'User already registered!');
  }
  const hash = bcrypt.hashSync(user.password, Number(SALT_ROUNDS));
  const newUser = await models.user.createUser(FIRST_COLLECTION_NAME, { ...user, password: hash });
  const {
    name, email, userId,
  } = newUser;
  const token = createToken(newUser);
  return {
    name, email, userId, token,
  };
};

const logIn = async (item) => {
  const user = await models.user.logIn(FIRST_COLLECTION_NAME, item);
  if (!user) {
    throw errorConstructor(StatusCodes.NOT_ACCEPTABLE, 'Email or password do not match');
  }
  if (!verifyPassword(item.password, user.password)) {
    throw errorConstructor(StatusCodes.NOT_ACCEPTABLE, 'Email or password do not match');
  }
  const {
    name, email, userId,
  } = user;
  const token = createToken(user);
  return { name, email, token, userId };
};

module.exports = {
  createUser,
  logIn,
  findByEmail,
  findById,
  deleteById,
  resetPassword,
  sendEmail,
};
