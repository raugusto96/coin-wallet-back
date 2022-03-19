const { MongoClient } = require('mongodb');
require('dotenv').config();

const { ATLAS_URI, DB_NAME } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (
  db
    ? Promise.resolve(db)
    : MongoClient.connect(ATLAS_URI, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      })
);

module.exports = connection;
