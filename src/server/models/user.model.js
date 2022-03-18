const connection = require('./connection');

const findByNickname = async (collectionName, nickname) => {
  try {
    const db = await connection();
    const findedNick = await db.collection(collectionName)
      .findOne({ nickname });
    return findedNick;
  } catch (error) {
    return error;
  }
};

const getByNickname = async (collectionName, nickname) => {
  try {
    const db = await connection();
    const findedId = await db.collection(collectionName)
      .findOne({ nickname });
    return findedId;
  } catch (error) {
    return error;
  }
};

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
    const formatedEmail = email.trim();
    const db = await connection();
    const user = await db.collection(collectionName).findOne({ email: formatedEmail });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  logIn,
  findByEmail,
  getByNickname,
  findByNickname,
};
