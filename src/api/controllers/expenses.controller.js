const { StatusCodes } = require('http-status-codes');
const services = require('../services');

const createExpense = async (req, res) => {
  try {
    const expense = await services.expenses.createExpense(req.body);
    return res.status(StatusCodes.CREATED).json({ expense });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

module.exports = {
  createExpense,
};
