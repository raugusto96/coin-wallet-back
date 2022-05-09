require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../mock');
const models = require('../../../api/models');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, SECOND_COLLECTION_NAME } = process.env;

async function deleteAllData(myDbName, myDbCollection) {
  await models.connection(myDbName)
    .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Acha todas as despesas', () => {
  let connectionMock;
  
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db(DB_NAME).createCollection(SECOND_COLLECTION_NAME);
    await models.expense.createExpense(SECOND_COLLECTION_NAME, mock.expense.payloadCreateExpense);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando encontra as despesas corretamente', () => {
    it('Retorna um array', async () => {
      const response = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
      expect(response).to.be.an('array');
    });
    it('Contém ao menos um elemento', async () => {
      const response = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
      expect(response).to.have.length(1);
    });
    it('Retorna um array contendo objetos', async () => {
      const [response] = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
      expect(response).to.be.an('object');
    });
    it('Cada elemento do array é um objeto contendo as chaves "id", "value", "title", "type", "category", "created", "updated"', async () => {
      const [response] = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
      expect(response).to.have.all.keys(['_id', 'value', 'title', 'type', 'category', 'created', 'updated']);
    });
  });
  describe('Quando não encontra uma despesa', () => {
    it('Retorna um array vazio', async () => {
      await deleteAllData(DB_NAME,  SECOND_COLLECTION_NAME);
      const response = await models.expense.getAllExpenses(SECOND_COLLECTION_NAME);
      expect(response).to.have.length(0)
    });
  });
});