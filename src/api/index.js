const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const path = require('path');
const router = require('./routes');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'static', 'build')));

app.get('/', (_req, res) => {
  res.send('Coin Wallet API!');
  // res.sendFile(path.join(__dirname, 'static', 'public', 'build', 'index.html'));
});

app.use('/', router.user);
app.use('/', router.expenses);

app.listen(PORT, () => console.log(`App listening the port: ${PORT}`));

module.exports = app;
