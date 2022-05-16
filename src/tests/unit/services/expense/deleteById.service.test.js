const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

describe('Testa a função deleteById do service', () => {
  
  describe('Quando encontra a despesa para deletar', () => {
    
    before(() => {
      sinon.stub(models.expense, 'findById').resolves(mock.expense.responseFindedExpense);
      sinon.stub(models.expense, 'deleteById').resolves({ acknowledged: true, deletedCount: 1 });
    });
    
    after(() => {
      models.expense.findById.restore();
      models.expense.deleteById.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await services.expenses.deleteById(1);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto com as chaves "acknowledged", "deletedCount"', async () => {
      const response = await services.expenses.deleteById(1);
      expect(response).to.have.all.keys(['acknowledged', 'deletedCount']);
    });
    it('Retorna um objeto com a chave "deletedCount" com o valor "1"', async () => {
      const { deletedCount } = await services.expenses.deleteById(1);
      expect(deletedCount).to.be.equal(1);
    });
  });
});