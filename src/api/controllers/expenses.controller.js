const { StatusCodes } = require('http-status-codes');
const services = require('../services');

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
      .createExpense({ userId: Number(userId), body: req.body });
    return res.status(StatusCodes.CREATED).json({ expense });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

module.exports = {
  createExpense,
  deleteById,
};
