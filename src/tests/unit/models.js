const sinon = require('sinon');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const errorConstructor = require('../../api/utils/errorConstructor.function');
const { DB_NAME, FIRST_COLLECTION_NAME, SECOND_COLLECTION_NAME } = process.env;

const { getConnection } = require('./connection');

const models = require('../../api/models');

const sampleCorrectUser = {
	email: "email@mail.com",
	name: "Fulano",
	password: "123456789"
}

const sampleIncorrectUser = {
	email: "email@mailcom",
	name: "Fu",
	password: "123"
}

describe('Testando o user.model', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(FIRST_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  describe('Testando o user.model.createUser', () => {
      it('Deve criar um usuário corretamente', async () => {
        const user = await models.user.createUser(FIRST_COLLECTION_NAME, sampleCorrectUser);

        const expectedUser = {
          _id: new ObjectId(),
          email: "email@mail.com",
          name: "Fulano",
          password: "123456789",
          created: new Date(),
          updated: new Date(),
          userId: 1
        }

        expect(user).to.be.a('object');
        expect(user).to.deep.equal(expectedUser);
      });
  });
});
