require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../mock');
const models = require('../../../api/models');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Acha todos os usuários', () => {
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

  describe('Quando encontra os usuários corretamente', () => {
    it('Retorna um array', async () => {
      const response = await models.user.findAllUsers(FIRST_COLLECTION_NAME);
      expect(response).to.be.an('array');
    });
    it('Cada objeto do array possui as chaves "email", "name", "password", "userId", "id", "created", "updated"', async () => {
      const response = await models.user.findAllUsers(FIRST_COLLECTION_NAME);
      response.forEach((user) => expect(user).to.have.all.keys(['email', 'name', 'password', 'userId', '_id', 'created', 'updated']));
    });
  });
  describe('Quando não encontra usuários', () => {
    it('Retorna um array vazio', async () => {
      const user = await models.user.findByUserId(FIRST_COLLECTION_NAME, 1);
      await models.user.deleteById(FIRST_COLLECTION_NAME, user);
      const response = await models.user.findAllUsers(FIRST_COLLECTION_NAME);
      expect(response).to.have.length(0);
    });
  });
});