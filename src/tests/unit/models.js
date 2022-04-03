const sinon = require('sinon');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { set, reset } = require('mockdate');
const { DB_NAME, FIRST_COLLECTION_NAME, SECOND_COLLECTION_NAME } = process.env;

const { getConnection } = require('./connection');

const models = require('../../api/models');
const mocks = require('../mock');

const date = new Date();

const expectedUser = {
  _id: new ObjectId(),
  email: "email@mail.com",
  name: "Fulano",
  password: "123456789",
  created: date,
  updated: date,
  userId: 1
};

const expectedExpense = {
  value: 30,
  title: "Comprar pão",
  type: "withdraw",
  category: "Alimentação",
  date: "20/03/2022",
  created: date,
  updated: date,
  _id: '624a245f6cbfae3a0a9e2b83',
  userId: 1
};

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

  beforeEach(() => {
    set(date);
  });

  afterEach(() => {
    reset();
  });

  describe('Testando as funções básicas', () => {
    it('Deve contar um CRUD básico', () => {
      const { user } = models;
      expect(user).to.be.an('object');
      expect(user).to.have.all.keys(mocks.keys.userModelKeys);
      Object.values(user).forEach((basicFunc) => expect(basicFunc).to.be.an('function'));
    });
  });

  const createTemplateTest = (collection, value, modelFunc) => async () => {
    const user = await models.user[modelFunc](collection, value);
    // console.log(user);
    expect(user).to.be.an('object');
    expect(user).to.have.all.keys(mocks.keys.userObjectKeys);
    expect(user).to.eql(expectedUser);
  };

  describe('Testando o user.model.createUser', () => {
    it('Deve criar um usuário corretamente',
    createTemplateTest(FIRST_COLLECTION_NAME, mocks.user.sampleCorrectUser, 'createUser'));
  });
  describe('Testando o user.model.logIn', () => {
    it('Deve retornar o usuário cadastrado anteriormente',
    createTemplateTest(FIRST_COLLECTION_NAME, mocks.user.sampleCorrectUser, 'logIn'));
  });
  describe('Testando o user.model.findByEmail', () => {
    it('Deve retornar o usuário pesquisado pelo email ',
    createTemplateTest(FIRST_COLLECTION_NAME, mocks.user.sampleCorrectUser.email, 'findByEmail'));
  });
  describe('Testando o user.model.findByUserId', () => {
    it('Deve retornar o usuário pesquisado pelo id',
    createTemplateTest(FIRST_COLLECTION_NAME, 1, 'findByUserId'));
  });
  describe('Testando o user.model.findById', async () => {
    it('Deve retornar o usuário pesquisado pelo id', async () => {
      const findedUser = await models.user.findByUserId(FIRST_COLLECTION_NAME, 1);
      const user = await models.user.findById(FIRST_COLLECTION_NAME, findedUser._id);
      expect(user).to.be.an('object');
      expect(user).to.have.all.keys(mocks.keys.userObjectKeys);
      expect(user).to.eql(expectedUser);
    });
  });
  describe('Testando o user.model.resetPassword', () => {
    it('Deve retornar dados indicando quantos usuários foram alterados', async () => {
      const user = await models.user.resetPassword(FIRST_COLLECTION_NAME, { email: mocks.user.sampleCorrectUser.email, password: '987654321'});
      expect(user).to.be.an('object');
      expect(user).to.have.property('modifiedCount');
      expect(user.modifiedCount).to.be.equal(1);
    });
  });
  describe('Testando o user.model.deleteById', () => {
    beforeEach(() => {
      connectionMock.db(DB_NAME)
        .collection(FIRST_COLLECTION_NAME)
        .insertOne({
          ...mocks.user.sampleCorrectUser, created: new Date(), updated: new Date(), userId: 2,
        });
    });
    it('Deve retornar dados indicando quantos usuários foram deletados', async () => {
      const findedUser = await models.user.findByUserId(FIRST_COLLECTION_NAME, 2);
      const user = await models.user.deleteById(FIRST_COLLECTION_NAME, findedUser);
      expect(user).to.be.an('object');
      expect(user).to.have.property('deletedCount');
      expect(user.deletedCount).to.be.equal(1);
    });
  });
});

describe('Testando o expense.model', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(SECOND_COLLECTION_NAME).drop();
    MongoClient.connect.restore();
  });

  beforeEach(() => {
    set(date);
  });

  afterEach(() => {
    reset();
  });

  describe('Testando as funções básicas', () => {
    it('Deve conter um CRUD básico', () => {
      const { expense } = models;
      expect(expense).to.be.an('object');
      expect(expense).to.have.all.keys(mocks.keys.expenseModelKeys);
      Object.values(expense).forEach((basicFunc) => expect(basicFunc).to.be.a('function'));
    });
  });

  const createTemplateTest = (collection, value, modelFunc) => async () => {
    const expense = await models.expense[modelFunc](collection, value);
    // console.log(expense);
    expect(expense).to.be.an('object');
    expect(expense).to.have.all.keys(mocks.keys.expenseObjectKeys);
    expect(expense).to.eql(expectedExpense);
  };

  describe('Testando o expense.createExpense', () => {
    it('Deve criar uma despesa corretamente',
    createTemplateTest(SECOND_COLLECTION_NAME, mocks.expense.sampleExpense, 'createExpense'));
  });
  describe('Testando o expense.findById', () => {
    it('Deve retornar a despesa editada corretamente', async () => {
      const updatedExpense = await models.expense.updateExpense(SECOND_COLLECTION_NAME,
        { id: '624a245f6cbfae3a0a9e2b83', data: mocks.expense.updateExpense });
      expect(updatedExpense).to.be.an('object');
      expect(updatedExpense).to.have.property('modifiedCount');
      expect(updatedExpense.modifiedCount).to.be.equal(1);
    });
  });
});
