require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const mock = require('../../mock');
const models = require('../../../api/models');
const { getConnection } = require('./mongoMockConnection');

const { DB_NAME, FIRST_COLLECTION_NAME } = process.env;

describe('Atualiza a senha do usuário', () => {
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

  describe('Quando acha o usuário e atualiza a senha com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.payloadResetPassword);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "modifiedCount", "upsertedId", "upsertedCount", "matchedCount"', async () => {
      const response = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.payloadResetPassword);
      expect(response).to.have.all.keys(['acknowledged', 'modifiedCount', 'upsertedId', 'upsertedCount', 'matchedCount']);
    });
    it('Retorna um objeto com a chave "modifiedCount" e o valor "1"', async () => {
      const { modifiedCount } = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.payloadResetPassword);
      expect(modifiedCount).to.be.equal(1);
    });
    it('Retorna um objeto com a chave "matchedCount" e o valor "1"', async () => {
      const { matchedCount } = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.payloadResetPassword);
      expect(matchedCount).to.be.equal(1);
    });
  });
  describe('Quando não acha o usuário', () => {
    it('Retorna um objeto', async () => {
      const response = await models.user.resetPassword(FIRST_COLLECTION_NAME, { email: '', password: '' });
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "modifiedCount", "upsertedId", "upsertedCount", "matchedCount"', async () => {
      const response = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.payloadResetPassword);
      expect(response).to.have.all.keys(['acknowledged', 'modifiedCount', 'upsertedId', 'upsertedCount', 'matchedCount']);
    });
    it('Retorna um objeto com a chave "modifiedCount" e o valor "0"', async () => {
      const { modifiedCount } = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.emptyPayloadResetPassword);
      expect(modifiedCount).to.be.equal(0);
    });
    it('Retorna um objeto com a chave "matchedCount" e o valor "0"', async () => {
      const { matchedCount } = await models.user.resetPassword(FIRST_COLLECTION_NAME, mock.user.emptyPayloadResetPassword);
      expect(matchedCount).to.be.equal(0);
    });
  });
});