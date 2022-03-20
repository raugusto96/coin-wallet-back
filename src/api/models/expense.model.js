const connection = require('./connection');

const createExpense = async (collectionName, data) => {
  try {
    const db = await connection();
    const expense = await db.collection(collectionName)
      .insertOne({ ...data, created: new Date(), updated: new Date() });
    const { insertedId: _id } = expense;
    return ({
      ...data, created: new Date(), updated: new Date(), _id,
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createExpense,
};
