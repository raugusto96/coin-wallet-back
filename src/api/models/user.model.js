const connection = require('./connection');

const findByUserId = async (collectionName, id) => {
  const db = await connection();
  const user = await db.collection(collectionName)
    .findOne({ userId: id });
  return user;
};

const getAllUsers = async (collectionName) => {
  const db = await connection();
  const allUsers = await db.collection(collectionName)
    .find().toArray();
  return allUsers;
};

const resetPassword = async (collectionName, user) => {
  const db = await connection();
  const updated = await db.collection(collectionName)
    .updateOne({ email: user.email }, { $set: { password: user.password, updated: new Date() } });
  return updated;
};

const deleteById = async (collectionName, user) => {
  const db = await connection();
  const deleted = await db.collection(collectionName)
    .deleteOne(user);
  return deleted;
};

const findByEmail = async (collectionName, email) => {
  const db = await connection();
  const findedEmail = await db.collection(collectionName)
    .findOne({ email });
  return findedEmail;
};

const createUser = async (collectionName, user) => {
  const users = await getAllUsers(collectionName);
  const db = await connection();
  const createdUser = await db.collection(collectionName)
    .insertOne({
      ...user, created: new Date(), updated: new Date(), userId: users.length + 1,
    });
  const { insertedId: id } = createdUser;
  return ({
    ...user, userId: users.length + 1, id,
  });
};

const logIn = async (collectionName, { email }) => {
  const db = await connection();
  const user = await db.collection(collectionName).findOne({ email });
  return user;
};

module.exports = {
  createUser,
  logIn,
  findByEmail,
  getAllUsers,
  deleteById,
  findByUserId,
  resetPassword,
};
