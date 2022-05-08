const { StatusCodes } = require('http-status-codes');
const errorConstructor = require('../utils/errorConstructor.function');
const expenseTypes = require('../constants/expenseTypes.constant');
const expenseCategories = require('../constants/expenseCategories.constant');

const validateExpenseData = async (req, _res, next) => {
  const {
    value, title, type, category,
  } = req.body;
  if (value === undefined) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Value" is required'));
  }
  if (title === undefined) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Title" is required'));
  }
  if (type === undefined) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Type" is required'));
  }
  if (category === undefined) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Category" is required'));
  }
  if (value <= 0) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Value" must to be more than 0'));
  }
  if (title.length < 6) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Title" must to be more than 5 characteres'));
  }
  if (!expenseTypes.includes(type)) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Type" is invalid'));
  }
  if (!expenseCategories.includes(category)) {
    return next(errorConstructor(StatusCodes.NOT_ACCEPTABLE, '"Category" is invalid'));
  }
  next();
};

module.exports = {
  validateExpenseData,
};
