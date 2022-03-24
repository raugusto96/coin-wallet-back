const models = require('../models');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');

const { SECOND_COLLECTION_NAME } = process.env;

const findById = async (id) => {
  const expense = await models.expense.findById(SECOND_COLLECTION_NAME, id);
  if (!expense) {
    throw errorConstructor('Expense doesn\'t exist');
  }
  const { _id, title, type } = expense;
  return { _id, title, type };
};

const deleteById = async (id) => {
  const findedExpense = await findById(id);
  await models.expense.deleteById(SECOND_COLLECTION_NAME, findedExpense);
  return { status: 'deleted' };
};

const createExpense = async (data) => {
  const expense = await models.expense.createExpense(SECOND_COLLECTION_NAME, data);
  return expense;
};

module.exports = {
  createExpense,
  deleteById,
};
