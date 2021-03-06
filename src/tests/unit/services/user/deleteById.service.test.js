const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

describe('Testando a função deleteById do service', () => {
  before(() => {
    sinon.stub(models.user, 'deleteById').resolves(mock.user.responseDeletedData);
    sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
  });

  after(() => {
    models.user.findByUserId.restore();
    models.user.deleteById.restore();
  });

  describe('Quando remove um usuário encontrado', () => {
    it('Retorna "undefined"', async () => {
      const response = await services.user.deleteById('1');
      expect(response).to.be.undefined;
    });
  });
  describe('Quando não encontra um usuário para remover', () => {
    it('Lança um erro com a mensagem "User doesn\'t exist', async () => {
      models.user.findByUserId.restore();
      sinon.stub(models.user, 'findByUserId').rejects('User doesn\'t exist');
      try {
        await services.user.deleteById('10');  
      } catch (error) {
        expect(error).to.match(/user doesn\'t exist/i);
      }
    });
  });
});