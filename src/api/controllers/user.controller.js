const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const sendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await services.user.sendEmail(email);
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    await services.user.resetPassword(email, password);
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await services.user.findById(Number(id));
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await services.user.deleteById(Number(id));
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await services.user.createUser({ email, name, password });
    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const user = await services.user.logIn(req.body);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  logIn,
  findById,
  deleteById,
  resetPassword,
  sendEmail,
};
