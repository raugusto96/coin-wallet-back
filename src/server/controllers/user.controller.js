const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const logIn = async (req, res) => {
  const token = await services.user.logIn(req.body);
  if (token.err) return res.status(StatusCodes.NOT_ACCEPTABLE).json(token);
  return res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  logIn,
};
