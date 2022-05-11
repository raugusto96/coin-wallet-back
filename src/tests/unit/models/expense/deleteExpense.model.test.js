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

describe('Testa a função deleteExpense ao remover uma despesa do BD', () => {
  let connectionMock;
  let expense = null;
  let createdExpense = null;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db(DB_NAME).createCollection(SECOND_COLLECTION_NAME);
  });

  beforeEach(async () => {
    createdExpense = await models.expense.createExpense(SECOND_COLLECTION_NAME, mock.expense.payloadCreateExpense);
    expense = await models.expense.findById(SECOND_COLLECTION_NAME, createdExpense.id);
  })

  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando deleta com sucesso uma despesa', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, expense);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "deletedCount"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, expense);
      expect(response).to.have.all.keys(['acknowledged', 'deletedCount']);
    });
    it('Retorna um objeto com a chave "acknowledged" e o valor "true"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, expense);
      expect(response).to.have.property('acknowledged');
      expect(response.acknowledged).to.be.true;
    });
    it('Retorna um objeto com a chave "deletedCount" e o valor "1"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, expense);
      expect(response).to.have.property('deletedCount');
      expect(response.deletedCount).to.be.equal(1);
    });
  });
  describe('Quando não remove uma despesa', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, createdExpense);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "deletedCount"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, createdExpense);
      expect(response).to.have.all.keys(['acknowledged', 'deletedCount']);
    });
    it('Retorna um objeto com a chave "acknowledged" e o valor "true"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, createdExpense);
      expect(response).to.have.property('acknowledged');
      expect(response.acknowledged).to.be.true;
    });
    it('Retorna um objeto com a chave "deletedCount" e o valor "0"', async () => {
      const response = await models.expense.deleteById(SECOND_COLLECTION_NAME, createdExpense);
      expect(response).to.have.property('deletedCount');
      expect(response.deletedCount).to.be.equal(0);
    });
  });
});