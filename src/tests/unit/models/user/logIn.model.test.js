require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../../mock');
const models = require('../../../../api/models');
const { getConnection } = require('../mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Testa a função login', () => {
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

  describe('Quando encontra o usuário para realizar o login', () => {
    it('Retorna um objeto', async () => {
      const response = await models.user.logIn(FIRST_COLLECTION_NAME, mock.user.payloadCreateUser);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "id", "email", "name", "password", "created", "updated", "userId"', async () => {
      const response = await models.user.findByEmail(FIRST_COLLECTION_NAME, mock.user.payloadCreateUser.email);
      expect(response).to.have.all.keys(['_id', 'email', 'name', 'password', 'created', 'updated', 'userId']);
    });
  });
  describe('Quando não encontra o usuário', () => {
    it('Retorna "null"', async () => {
      const response = await models.user.logIn(FIRST_COLLECTION_NAME, mock.user.emptyPayloadResetPassword);
      expect(response).to.be.null;
    });
  });
});