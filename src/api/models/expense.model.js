const connection = require('./connection');

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
};
