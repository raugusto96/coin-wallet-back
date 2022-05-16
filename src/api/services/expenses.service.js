const { StatusCodes } = require('http-status-codes');
const models = require('../models');
require('dotenv').config();
const errorConstructor = require('../utils/errorConstructor.function');

const { FIRST_COLLECTION_NAME, SECOND_COLLECTION_NAME } = process.env;

const getAllExpensesByUser = async (id) => {
  const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
  const expenses = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
  if (!user) {
    throw errorConstructor(StatusCodes.NOT_FOUND, 'User doesn\'t exist');
  }
  const { name, email, userId } = user;
  const expense = expenses
    .filter((expense) => expense.userId === userId)
    .map(({ value, title, category, userId, type }) => ({ value, title, category, userId, type }));
  const userWithExpenses = {
    name,
    email,
    userId,
    expenses: expense,
  };
  return userWithExpenses;
};

const findById = async (userId) => {
  const expense = await models.expense.findById(SECOND_COLLECTION_NAME, userId);
  if (!expense) {
    throw errorConstructor(StatusCodes.NOT_FOUND, 'Expense doesn\'t exist');
  }
  const { id, title, type } = expense;
  return { id, title, type };
};

const updateById = async (data) => {
  await findById(data.id);
  const updated = await models.expense.updateExpense(SECOND_COLLECTION_NAME, data);
  return updated;
};

const deleteById = async (id) => {
  const findedExpense = await findById(id);
  const deleted = await models.expense.deleteById(SECOND_COLLECTION_NAME, findedExpense);
  return deleted;
};

const createExpense = async (data) => {
  const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, data.userId);
  if (!user) {
    throw errorConstructor(StatusCodes.BAD_REQUEST, 'User doesn\'t exist');
  }
  const expense = await models.expense.createExpense(SECOND_COLLECTION_NAME, data);
  const { userId, value, title, category, type, id } = expense;
  return { userId, value, title, category, type, id };
};

module.exports = {
  createExpense,
  deleteById,
  updateById,
  getAllExpensesByUser,
  findById,
};
