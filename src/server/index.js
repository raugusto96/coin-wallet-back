const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).json();
});

app.listen(PORT, () => console.log(`App listening the port: ${PORT}`));

module.exports = app;
