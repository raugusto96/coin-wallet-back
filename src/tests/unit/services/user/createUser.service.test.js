require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const bcrypt = require('bcrypt');

describe('Testando a função createUser do service', () => {

  let spied = null;

  before(() => {
    sinon.stub(models.user, 'createUser').resolves({
      email: "fulano@mail.com",
      name: "Fulano da Silva",
      userId: 1,
    });
  });

  after(() => {
    models.user.createUser.restore();
  });

  describe('Quando cria o usuário com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await services.user.createUser(mock.user.payloadCreateUser);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto contendo as chaves "name", "email", "userId", "token"', async () => {
      const response = await services.user.createUser(mock.user.payloadCreateUser);
      expect(response).to.have.all.keys(['name', 'userId', 'token', 'email'])
    });
    it('Testa se a função "hashSync" foi chamada', async () => {
      spied = sinon.spy(bcrypt, 'hashSync');
      await services.user.createUser(mock.user.payloadCreateUser);
      expect(spied.callCount).to.be.equal(1);
      bcrypt.hashSync.restore();
    });
  });
  describe('Quando o usuário já existe no BD', () => {
    it('Lança um erro com o status "409" e a mensagem "User already registered!"', async () => {
      sinon.stub(models.user, 'findByEmail').resolves('not null');
      try {
        await services.user.createUser(mock.user.payloadCreateUser);
      } catch (error) {
        expect(error.status).to.be.equal(409);
        expect(error.message).to.be.equal('User already registered!');
      }
      models.user.findByEmail.restore();
    });
  });
});