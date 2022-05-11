require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../../mock');
const models = require('../../../../api/models');
const { getConnection } = require('../mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Testa a função findByUserId', () => {
  let connectionMock;
  
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db(DB_NAME).createCollection(FIRST_COLLECTION_NAME);
    await models.user.createUser(FIRST_COLLECTION_NAME, mock.user.payloadCreateUser);
  });
  
  after(async () => {
    await connectionMock.db(DB_NAME).collection(FIRST_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando encontra um usuário corretamente', () => {
    it('Retorna um objeto', async () => {
      const id = 1;
      const response = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "email", "name", "password", "userId", "id", "created", "updated"', async () => {
      const id = 1;
      const response = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      expect(response).to.have.all.keys(['email', 'name', 'password', 'userId', '_id', 'created', 'updated']);
    });
  });
  describe('Quando não encontra o usuário', () => {
    it('Retorna "null"', async () => {
      const id = 10;
      const response = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      expect(response).to.be.null;
    });
  });
});