const models = require('../models');
require('dotenv').config();

const { SECOND_COLLECTION_NAME } = process.env;

const createExpense = async (data) => {
  const expense = await models.expense.createExpense(SECOND_COLLECTION_NAME, data);
  return expense;
};

module.exports = {
  createExpense,
};
