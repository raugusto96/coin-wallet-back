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

describe('Acha uma despesa pelo id', () => {
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

  afterEach(async () => {
    await deleteAllData(DB_NAME, SECOND_COLLECTION_NAME);
  })
  
  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando encontra um usuário', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.findById(SECOND_COLLECTION_NAME, expense.id);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "id", "value", "title", "type", "category", "created", "updated"', async () => {
      const response = await models.expense.findById(SECOND_COLLECTION_NAME, expense.id);
      expect(response).to.have.all.keys(['_id', 'value', 'title', 'type', 'category', 'created', 'updated']);
    });
  });
});