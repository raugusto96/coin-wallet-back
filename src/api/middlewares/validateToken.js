const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');

const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json(errorConstructor('Token not found'));

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    req.user = payload.data;
    next();
    return true;
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(errorConstructor('Expired or invalid token'));
  }
};

module.exports = validateToken;
