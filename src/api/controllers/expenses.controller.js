const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const getAllExpensesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await services.expenses.getAllExpensesByUser(userId);
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await services.expenses.updateById({ id, data: req.body });
    return res.status(StatusCodes.OK).json(expense);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await services.expenses.deleteById(id);
    return res.status(StatusCodes.OK).json(status);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId } = req.params;
    const expense = await services.expenses
      .createExpense({ userId: Number(userId), ...req.body });
    return res.status(StatusCodes.CREATED).json({ expense });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

module.exports = {
  createExpense,
  deleteById,
  updateById,
  getAllExpensesByUser,
};
