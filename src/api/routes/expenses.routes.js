const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post(
  '/:userId/create-expense',
  middlewares.validateToken,
  middlewares.expense.validateExpenseData,
  controllers.expenses.createExpense,
);
router.get('/expenses', () => {});
router.put('expenses/:id', () => {});
router.delete('expenses/:id', () => {});

module.exports = router;
