const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllExpenses = async (collectionName) => {
  try {
    const db = await connection();
    const expenses = await db.collection(collectionName)
      .find().toArray();
    return expenses;
  } catch (error) {
    return error;
  }
};

const updateExpense = async (collectionName, { id, data }) => {
  try {
    const db = await connection();
    return await db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, {
        $set: {
          ...data, updated: new Date(),
        },
      });
  } catch (error) {
    return error;
  }
};

const findById = async (collectionName, id) => {
  try {
    const db = await connection();
    const findedExpense = await db.collection(collectionName)
      .findOne(ObjectId(id));
    return findedExpense;
  } catch (error) {
    return error;
  }
};

const deleteById = async (collectionName, expense) => {
  try {
    const db = await connection();
    const deletedExpense = await db.collection(collectionName)
      .deleteOne(expense);
    return deletedExpense;
  } catch (error) {
    return error;
  }
};

const createExpense = async (collectionName, data) => {
  try {
    const db = await connection();
    const expense = await db.collection(collectionName)
      .insertOne({
        ...data.body, created: new Date(), updated: new Date(), userId: data.userId,
      });
    const { insertedId: _id } = expense;
    return ({
      ...data.body, created: new Date(), updated: new Date(), _id, userId: data.userId,
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createExpense,
  deleteById,
  findById,
  updateExpense,
  getAllExpenses,
};
