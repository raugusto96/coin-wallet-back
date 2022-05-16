const payloadCreateExpense = {
  value: 500,
  title: 'Comprar roupa',
  type: 'withdraw',
  category: 'Casa'
};

const payloadUpdateExpense = {
  value: 100,
  title: 'Comprar presente',
  type: 'withdraw',
  category: 'Lazer'
};

const responseExpensesData = [
  {
    value: 30,
    title: "Comprar pão",
    category: "Alimentação",
    userId: 1,
    type: "withdraw"
  },
];

module.exports = {
  payloadCreateExpense,
  payloadUpdateExpense,
  responseExpensesData,
}