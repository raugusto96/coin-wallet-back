const { ObjectId } = require('mongodb');
const connection = require('./connection');

const resetPassword = async (collectionName, email, password) => {
  try {
    const db = await connection();
    return await db.collection(collectionName)
      .updateOne({ email }, { $set: { password } });
  } catch (error) {
    return error;
  }
};

const findById = async (collectionName, id) => {
  try {
    const db = await connection();
    const findedId = await db.collection(collectionName)
      .findOne(ObjectId(id));
    return findedId;
  } catch (error) {
    return error;
  }
};

const deleteById = async (collectionName, user) => {
  try {
    const db = await connection();
    const deletedUser = await db.collection(collectionName)
      .deleteOne(user);
    return deletedUser;
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
  findById,
  deleteById,
  resetPassword,
};
