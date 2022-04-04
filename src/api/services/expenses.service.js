const { StatusCodes } = require('http-status-codes');
const models = require('../models');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');

const { FIRST_COLLECTION_NAME, SECOND_COLLECTION_NAME } = process.env;

const getAllExpensesByUser = async (userId) => {
  const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, userId);
  const expenses = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
  if (!user) {
    throw errorConstructor(StatusCodes.BAD_REQUEST, 'User doesn\'t exist');
  }
  delete user.create;
  delete user.password;
  delete user.update;
  const userWithExpenses = {
    ...user,
    expenses: expenses
      .filter((expense) => expense.userId === user.userId),
  };
  return userWithExpenses;
};

const updateById = async (data) => {
  const updated = await models.expense.updateExpense(SECOND_COLLECTION_NAME, data);
  if (updated.matchedCount < 1) {
    throw errorConstructor(StatusCodes.BAD_REQUEST, 'Expense doesn\'t exist');
  }
  return { status: 'updated' };
};

const findById = async (id) => {
  const expense = await models.expense.findById(SECOND_COLLECTION_NAME, id);
  if (!expense) {
    throw errorConstructor(StatusCodes.BAD_REQUEST, 'Expense doesn\'t exist');
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
  updateById,
  getAllExpensesByUser,
};
