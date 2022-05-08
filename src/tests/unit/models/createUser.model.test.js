const sinon = require('sinon');
require('dotenv').config();
const { expect } = require('chai');
const mock = require('../../mock');
const models = require('../../../api/models');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Insere um novo filme no BD', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(FIRST_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Quando é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await models.user.createUser(FIRST_COLLECTION_NAME, mock.createUser.payloadCreateUser);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto contendo as chaves "email", "name", "password", "userId", "id"', async () => {
      const response = await models.user.createUser(FIRST_COLLECTION_NAME, mock.createUser.payloadCreateUser);
      expect(response).to.be.have.all.keys(['email', 'name', 'password', 'userId', 'id']);
    });
    it('Deve existir um usuário com o nome "Fulano da Silva" cadastrado no banco', async () => {
      await models.user.createUser(FIRST_COLLECTION_NAME, mock.createUser.payloadCreateUser);
      const movieCreated = await connectionMock
        .db(DB_NAME)
        .collection(FIRST_COLLECTION_NAME)
        .findOne({ name: mock.createUser.payloadCreateUser.name });
      expect(movieCreated).to.be.not.null;
    });
  });
});