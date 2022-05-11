require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

const { FIRST_COLLECTION_NAME } = process.env;

describe('Testando a função deleteById do service', () => {
  before(() => {
    sinon.stub(models.user, 'deleteById').resolves(mock.user.responseDeletedData);
    sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
  });

  after(() => {
    models.user.deleteById.restore();
  });

  describe('Quando remove um usuário encontrado', () => {
    it('Retorna um objeto', async () => {
      const response = await services.user.deleteById('1');
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowlewdged", "deletedCount"', async () => {
      const response = await services.user.deleteById('1');
      expect(response).to.have.all.keys(['acknowledged', 'deletedCount']);
    });
    it('Retorna um objeto com a chave "deletedCount" e o valor "1"', async () => {
      const response = await services.user.deleteById('1');
      expect(response).to.have.property('deletedCount');
      expect(response.deletedCount).to.be.equal(1);
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