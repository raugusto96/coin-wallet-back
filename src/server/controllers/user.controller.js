const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const resetPassword = async (req, res) => {
  try {
    const { email, name } = req.body;
    await services.user.resetPassword(email, name);
    return res.status(StatusCodes.OK).json();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await services.user.findById(id);
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await services.user.deleteById(id);
    return res.status(StatusCodes.OK).json(status);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await services.user.createUser(req.body);
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.CONFLICT).json(error);
  }
};

const logIn = async (req, res) => {
  try {
    const user = await services.user.logIn(req.body);
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(error);
  }
};

module.exports = {
  createUser,
  logIn,
  findById,
  deleteById,
  resetPassword,
};
