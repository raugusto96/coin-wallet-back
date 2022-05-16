const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

describe('Testando a função login do service', () => {

  before(() => {
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(models.user, 'logIn').resolves({
      email: 'mail@mail.com',
      name: 'Fulana da Silva',
      userId: 1,
      id: ObjectId('507f1f77bcf86cd799439011'),
      password: mock.user.responseHashSync,
    });
  });

  after(() => {
    models.user.logIn.restore();
    bcrypt.compareSync.restore();
  });

  describe('Quando o usuário realiza o login com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await services.user.logIn(mock.user.payloadLoginData);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "email", "name", "userId", "token"', async () => {
      const response = await services.user.logIn(mock.user.payloadLoginData);
      expect(response).to.have.all.keys(['email', 'name', 'userId', 'token']);
    });
  });
  describe('Quando o usuário envia dados inválidos', () => {
    it('Lança um erro com status "406"', async () => {
      models.user.logIn.restore();
      sinon.stub(models.user, 'logIn').resolves(null);
      try {
        await services.user.logIn(mock.user.payloadLoginData);
      } catch (error) {
        expect(error.status).to.be.equal(406);
      }
    });
    it('Lança um erro com a mensagem "Email or password do not match"', async () => {
      try {
        await services.user.logIn(mock.user.payloadLoginData);
      } catch (error) {
        expect(error.message).to.be.equal('Email or password do not match');
      }
    });
  });
  describe('Quando o usuário coloca uma senha inválida', () => {
    it('Retorna um erro com status "406"', async () => {
      models.user.logIn.restore();
      sinon.stub(models.user, 'logIn').resolves({
        email: 'mail@mail.com',
        name: 'Fulana da Silva',
        userId: 1,
        id: ObjectId('507f1f77bcf86cd799439011'),
        password: mock.user.responseHashSync,
      });
      bcrypt.compareSync.restore();
      sinon.stub(bcrypt, 'compareSync').returns(false);
      try {
        await services.user.logIn(mock.user.payloadLoginData);
      } catch (error) {
        expect(error.status).to.be.equal(406);
      }
    });
    it('Lança um erro com a mensagem "Email or password do not match"', async () => {
      try {
        await services.user.logIn(mock.user.payloadLoginData);
      } catch (error) {
        expect(error.message).to.be.equal('Email or password do not match');
      }
    });
  });
});