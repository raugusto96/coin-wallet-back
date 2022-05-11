require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../../mock');
const models = require('../../../../api/models');
const { getConnection } = require('../mongoMockConnection');

const { DB_NAME, SECOND_COLLECTION_NAME } = process.env;

async function deleteAllData(myDbName, myDbCollection) {
  await models.connection(myDbName)
    .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Testa a função updateExpense', () => {
  let connectionMock;
  let expense = null;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db(DB_NAME).createCollection(SECOND_COLLECTION_NAME);
  });

  beforeEach(async () => {
    expense = await models.expense.createExpense(SECOND_COLLECTION_NAME, mock.expense.payloadCreateExpense);
  })

  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando atualiza com sucesso uma despesa', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.updateExpense(SECOND_COLLECTION_NAME, { id: expense.id, ...mock.expense.payloadUpdateExpense});
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "modifiedCount", "upsertedId", "upsertedCount", "matchedCount"', async () => {
      const response = await models.expense.updateExpense(SECOND_COLLECTION_NAME, { id: expense.id, ...mock.expense.payloadUpdateExpense});
      expect(response).to.have.all.keys(['acknowledged', 'modifiedCount', 'upsertedId', 'upsertedCount', 'matchedCount']);
    });
    it('Retorna um objeto com a chave "modifiedCount" e o valor "1"', async () => {
      const { modifiedCount } = await models.expense.updateExpense(SECOND_COLLECTION_NAME, { id: expense.id, ...mock.expense.payloadUpdateExpense});
      expect(modifiedCount).to.be.equal(1);
    });
    it('Retorna um objeto com a chave "matchedCount" e o valor "1"', async () => {
      const { matchedCount } = await models.expense.updateExpense(SECOND_COLLECTION_NAME, { id: expense.id, ...mock.expense.payloadUpdateExpense});
      expect(matchedCount).to.be.equal(1);
    });
  });
  describe('Quando não atualiza a despesa', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.updateExpense(SECOND_COLLECTION_NAME, mock.expense.payloadUpdateExpense);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "modifiedCount", "upsertedId", "upsertedCount", "matchedCount"', async () => {
      const response = await models.expense.updateExpense(SECOND_COLLECTION_NAME, mock.expense.payloadUpdateExpense);
      expect(response).to.have.all.keys(['acknowledged', 'modifiedCount', 'upsertedId', 'upsertedCount', 'matchedCount']);
    });
    it('Retorna um objeto com a chave "modifiedCount" e o valor "0"', async () => {
      const { modifiedCount } = await models.expense.updateExpense(SECOND_COLLECTION_NAME, mock.expense.payloadUpdateExpense);
      expect(modifiedCount).to.be.equal(0);
    });
    it('Retorna um objeto com a chave "matchedCount" e o valor "0"', async () => {
      const { matchedCount } = await models.expense.updateExpense(SECOND_COLLECTION_NAME, mock.expense.payloadUpdateExpense);
      expect(matchedCount).to.be.equal(0);
    });
  });
});