require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

describe('Testa a função findByEmail do service', () => {
  describe('Quando encontra o usuário', () => {

    before(() => {
      sinon.stub(models.user, 'findByEmail').resolves(mock.user.responseFindedUser);
    });
  
    after(() => {
      models.user.findByEmail.restore();
    });

    it('Retorna "true"', async () => {
      const response = await services.user.findByEmail('mail@mail.com')
      expect(response).to.be.true;
    });
  });
  
  describe('Quando não encontra o usuário', () => {

    before(() => {
      sinon.stub(models.user, 'findByEmail').resolves(null);
    });
  
    after(() => {
      models.user.findByEmail.restore();
    });

    it('Retorna "false"', async () => {
      const response = await services.user.findByEmail('mail@mail.com')
      expect(response).to.be.false;
    });
  });
});