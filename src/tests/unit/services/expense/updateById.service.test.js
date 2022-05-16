const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const { ObjectId } = require('mongodb');

describe('Testa a função updateById do service', () => {
  
  describe('Quando encontra a despesa para atualizar', () => {
    
    before(() => {
      sinon.stub(models.expense, 'findById').resolves(mock.expense.responseFindedExpense);
      sinon.stub(models.expense, 'updateExpense').resolves({ acknowledged: true, updatedCount: 1 });
    });
    
    after(() => {
      models.expense.findById.restore();
      models.expense.updateExpense.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await services.expenses.updateById(1);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "updatedCount"', async () => {
      const response = await services.expenses.updateById(1);
      expect(response).to.have.all.keys(['acknowledged', 'updatedCount']);
    });
    it('Retorna um objeto com a chave "updatedCount" e o valor "1"', async () => {
      const { updatedCount } = await services.expenses.updateById(1);
      expect(updatedCount).to.be.equal(1);
    });
  });
});