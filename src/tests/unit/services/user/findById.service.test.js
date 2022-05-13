require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

describe('Testa a função findById do service', () => {

  before(() => {
    sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
  });

  after(() => {
    models.user.findByUserId.restore();
  });

  describe('Quando encontra um usuário', () => {
    it('Retorna um objeto', async () => {
      const response = await services.user.findById('1');
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "email", "name", "userId"', async () => {
      const response = await services.user.findById('1');
      expect(response).to.have.all.keys(['email', 'name', 'userId']);
    });
    it('Retorna um objeto com a chave "email" e o valor "mail@mail.com"', async () => {
      const response = await services.user.findById('1');
      expect(response).to.have.a.property('email');
      expect(response.email).to.be.equal('mail@mail.com');
    });
    it('Retorna um objeto com a chave "name" e o valor "Fulana da Silva"', async () => {
      const response = await services.user.findById('1');
      expect(response).to.have.a.property('name');
      expect(response.name).to.be.equal('Fulana da Silva');
    });
    it('Retorna um objeto com a chave "userId" e o valor "1"', async () => {
      const response = await services.user.findById('1');
      expect(response).to.have.a.property('userId');
      expect(response.userId).to.be.equal(1);
    });
  });
  describe('Quando não encontra um usuário', () => {
    it('Lança um erro com a mensagem "User doesn\'t exist"', async () => {
      models.user.findByUserId.restore();
      sinon.stub(models.user, 'findByUserId').rejects('User doesn\'t exist');
      try {
        await services.user.findById('2');
      } catch (error) {
        expect(error).to.match(/user doesn\'t exist/i);
      }
    });
    it('Testa se chama a função errorConstructor', async () => {
      models.user.findByUserId.restore();
      sinon.stub(models.user, 'findByUserId').returns(null);
      try {
        await services.user.findById();
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.match(/user doesn\'t exist/i)
      }
    });
  });
});