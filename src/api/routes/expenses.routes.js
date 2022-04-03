const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post(
  '/:userId/create-expense',
  middlewares.validateToken,
  middlewares.expense.validateExpenseData,
  controllers.expenses.createExpense,
);
router.get('/:userId', middlewares.validateToken, controllers.expenses.getAllExpensesByUser);
router.put('/:id', middlewares.validateToken, controllers.expenses.updateById);
router.delete('/:id', middlewares.validateToken, controllers.expenses.deleteById);

module.exports = router;
