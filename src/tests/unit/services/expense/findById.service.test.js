const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const { ObjectId } = require('mongodb');

describe('Testa a função findById do service', () => {
  
  describe('Quando encontra a despesa', () => {
    
    before(() => {
      sinon.stub(models.expense, 'findById').resolves({ ...mock.expense.responseFindedExpense, id: ObjectId('507f1f77bcf86cd799439011')});
    });

    after(() => {
      models.expense.findById.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await services.expenses.findById(1);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto contendo todas as chaves "id", "title", "type"', async () => {
      const response = await services.expenses.findById(1);
      expect(response).to.have.all.keys(['id', 'title', 'type']);
    });
  });

  describe('Quando não encontra a despesa', () => {
    
    before(() => {
      sinon.stub(models.expense, 'findById').resolves(null);
    });
    
    after(() => {
      models.expense.findById.restore();
    });

    it('Lança um erro com o status "404"', async () => {
      try {
        await services.expenses.findById();
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });

    it('Lança um erro com a mensagem "Expense doesn\'t exist"', async () => {
      try {
        await services.expenses.findById();
      } catch (error) {
        expect(error.message).to.match(/expense doesn\'t exist/i);
      }
    });
  });
});