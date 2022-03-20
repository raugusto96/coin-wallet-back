const { StatusCodes } = require('http-status-codes');
const errorConstructor = require('../utils/errorConstructor.function');
const expenseTypes = require('../constants/expenseTypes.constant');
const expenseCategories = require('../constants/expenseCategories.constant');

const validateExpenseData = async (req, res, next) => {
  const {
    value, title, type, category, date,
  } = req.body;
  if (value <= 0) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Value" must to be more than 0'));
  }
  if (title.length < 6) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Title" must to be more than 5 characteres'));
  }
  if (!expenseTypes.includes(type)) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Type" is invalid'));
  }
  if (!expenseCategories.includes(category)) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Category" is invalid'));
  }
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const isDateValid = dateRegex.test(date);
  if (!isDateValid) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json(errorConstructor('"Date" is invalid'));
  }
  next();
  return true;
};

module.exports = {
  validateExpenseData,
};
