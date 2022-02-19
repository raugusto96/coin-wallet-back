const connection = require('./connection');

const createUser = async (collectionName, item) => {
  try {
    const db = await connection();
    const user = await db.collection(collectionName)
      .insertOne({ ...item, create: new Date(), update: new Date() });
    const { insertedId: _id } = user;
    return ({
      ...item, create: new Date(), update: new Date(), _id,
    });
  } catch (error) {
    return error;
  }
};

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
  createUser,
  logIn,
};
