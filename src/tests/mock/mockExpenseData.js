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
}

module.exports = {
  payloadCreateExpense,
  payloadUpdateExpense,
}