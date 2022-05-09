require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../mock');
const models = require('../../../api/models');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, SECOND_COLLECTION_NAME } = process.env;

describe('Insere uma nova despesa no BD', () => {
  let connectionMock;
  
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db(DB_NAME).createCollection(SECOND_COLLECTION_NAME);
  });
  
  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });
  describe('Quando é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await models.expense.createExpense(SECOND_COLLECTION_NAME, mock.expense.payloadCreateExpense);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "value", "title", "type", "category", "id"', async () => {
      const response = await models.expense.createExpense(SECOND_COLLECTION_NAME, mock.expense.payloadCreateExpense);
      expect(response).to.have.all.keys(['value', 'title', 'type', 'category', 'id']);
    });
  });
});