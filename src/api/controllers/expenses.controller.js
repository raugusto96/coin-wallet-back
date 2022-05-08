const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const getAllExpensesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await services.expenses.getAllExpensesByUser(Number(userId));
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, title, category, type } = req.body;
    await services.expenses.updateById({ id, value, title, category, type });
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await services.expenses.deleteById(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { value, title, type, category } = req.body;
    const expense = await services.expenses
      .createExpense({ userId: Number(userId), value, title, type, category });
    return res.status(StatusCodes.CREATED).json(expense);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createExpense,
  deleteById,
  updateById,
  getAllExpensesByUser,
};
