const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const createUser = async (req, res) => {
  const user = await services.user.createUser(req.body);
  if (user.error) return res.status(StatusCodes.CONFLICT).json(user);
  return res.status(StatusCodes.OK).json({ user });
};

const logIn = async (req, res) => {
  const token = await services.user.logIn(req.body);
  if (token.message) return res.status(StatusCodes.NOT_ACCEPTABLE).json(token);
  return res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  createUser,
  logIn,
};
