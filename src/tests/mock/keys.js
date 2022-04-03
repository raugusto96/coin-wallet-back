const userModelKeys = ['createUser', 'logIn', 'findByEmail', 'findById', 'deleteById', 'findByUserId', 'resetPassword'];
const userObjectKeys = ['name', 'email', '_id', 'created', 'updated', 'password', 'userId'];
const expenseModelKeys = ['createExpense', 'deleteById', 'findById', 'updateExpense', 'getAllExpenses'];
const expenseObjectKeys = ['value', 'type', 'date', 'category', 'title', '_id', 'created', 'updated', 'userId'];

module.exports = { userModelKeys, userObjectKeys, expenseModelKeys, expenseObjectKeys };