const connection = require('./connection');

const logIn = async (collectionName, { email, password }) => {
  try {
    const db = await connection();
    const user = await db.collection(collectionName).findOne({ email, password });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  logIn,
};
