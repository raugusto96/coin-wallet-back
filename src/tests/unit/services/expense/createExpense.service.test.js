const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const { ObjectId } = require('mongodb');

describe('Testa a função createExpense do service', () => {
  
  describe('Quando consegue criar uma nova despesa', () => {
    
    before(() => {
      sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
      sinon.stub(models.expense, 'createExpense').resolves({ ...mock.expense.responseCreateExpense, id: ObjectId('507f1f77bcf86cd799439011') })
    });
    
    after(() => {
      models.expense.createExpense.restore();
      models.user.findByUserId.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await services.expenses.createExpense(mock.expense.payloadCreateExpense);
      expect(response).to.be.an('object');
    });

    it('Retorna um objeto com as chaves "id", "value", "title", "category", "type", "userId"', async () => {
      const response = await services.expenses.createExpense(mock.expense.payloadCreateExpense);
      expect(response).to.have.all.keys(['id', 'value', 'title', 'category', 'type', 'userId']);
    });
  });

  describe('Quando não consegue criar uma nova despesa', () => {
    
    before(() => {
      sinon.stub(models.user, 'findByUserId').resolves(null);
    });
    
    after(() => {
      models.user.findByUserId.restore();
    });
    
    it('Lança um erro com o status "404"', async () => {
      try {
        await services.expenses.createExpense({ userId: 1 });
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });
    it('Lança um erro com a mensagem "User doesn\'t exist', async () => {
      try {
        await services.expenses.createExpense({ userId: 1 });
      } catch (error) {
        expect(error.message).to.match(/user doesn\'t exist/i);
      }
    });
  });
});