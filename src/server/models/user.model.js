const connection = require('./connection');

const findByEmail = async (collectionName, email) => {
  try {
    const formatedEmail = email.trim();
    const db = await connection();
    const findedEmail = await db.collection(collectionName)
      .findOne({ email: formatedEmail });
    return findedEmail;
  } catch (error) {
    return error;
  }
};

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

const logIn = async (collectionName, { email }) => {
  try {
    const db = await connection();
    const user = await db.collection(collectionName).findOne({ email });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  logIn,
  findByEmail,
};
