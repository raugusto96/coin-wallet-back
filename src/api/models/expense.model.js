const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllExpenses = async (collectionName) => {
  const db = await connection();
  const expenses = await db.collection(collectionName)
    .find().toArray();
  return expenses;
};

const updateExpense = async (collectionName, { id, value, title, type, category }) => {
  const db = await connection();
  const updated = await db.collection(collectionName)
    .updateOne({ _id: ObjectId(id) }, {
      $set: {
        value, title, type, category, updated: new Date(),
      },
    });
  return updated;
};

const findById = async (collectionName, id) => {
  const db = await connection();
  const findedExpense = await db.collection(collectionName)
    .findOne(ObjectId(id));
  return findedExpense;
};

const deleteById = async (collectionName, expense) => {
  const db = await connection();
  const deleted = await db.collection(collectionName)
  .deleteOne(expense);
  return deleted;
};

const createExpense = async (collectionName, data) => {
  const db = await connection();
  const expense = await db.collection(collectionName)
    .insertOne({
      ...data, created: new Date(), updated: new Date(),
    });
  const { insertedId: id } = expense;
  return ({
    ...data, id,
  });
};

module.exports = {
  createExpense,
  deleteById,
  findById,
  updateExpense,
  getAllExpenses,
};
