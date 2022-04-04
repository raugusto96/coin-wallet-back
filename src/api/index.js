const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const path = require('path');
const router = require('./routes');
const { error: handleError } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Coin Wallet API!');
});

app.use('/user', router.user);
app.use('/expenses', router.expenses);
app.use(handleError);

app.listen(PORT, () => console.log(`App listening the port: ${PORT}`));

module.exports = app;
