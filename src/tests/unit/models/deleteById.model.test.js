require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../mock');
const models = require('../../../api/models');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Remove um usuário do BD', () => {
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
  describe('Quando acha o usuário e remove com sucesso', () => {
    it('Retorna um objeto', async () => {
      const id = 1;
      const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      const response = await models.user.deleteById(FIRST_COLLECTION_NAME, user);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "deletedCount"', async () => {
      await models.user.createUser(FIRST_COLLECTION_NAME, mock.user.payloadCreateUser);
      const id = 1;
      const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      const response = await models.user.deleteById(FIRST_COLLECTION_NAME, user);
      expect(response).to.have.all.keys(['acknowledged', 'deletedCount']);
    });
    it('Retorna um objeto com a chave "deletedCount" e o valor "1"', async () => {
      await models.user.createUser(FIRST_COLLECTION_NAME, mock.user.payloadCreateUser);
      const id = 1;
      const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, id);
      const { deletedCount } = await models.user.deleteById(FIRST_COLLECTION_NAME, user);
      expect(deletedCount).to.be.equal(1);
    });
  });
});