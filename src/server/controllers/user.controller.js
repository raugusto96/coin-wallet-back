const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const getByNickname = async (req, res) => {
  try {
    const { nickname } = req.params;
    const user = await services.user.getByNickname(nickname);
    return res.status(StatusCodes.OK).json({ user });
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
  getByNickname,
};
