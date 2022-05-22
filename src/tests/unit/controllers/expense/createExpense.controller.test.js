const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');
const mock = require('../../../mock');

describe('Testando a função createExpense do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando cria a despesa com sucesso', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'createExpense').resolves(mock.expense.responseCreateExpense);
      request.params = { userId: '1' };
      request.body = {
        value: 75,
        title: 'Cinema',
        category: 'Lazer',
        type: 'withdraw',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    
    after(() => {
      services.expenses.createExpense.restore();
    });

    it('Envia um status "201"', async () => {
      await controllers.expenses.createExpense(request, response, next);

      expect(response.status.calledWith(StatusCodes.CREATED)).to.be.equal(true);
    });

    it('Envia a despesa criada ao finalizar a requisição', async () => {
      await controllers.expenses.createExpense(request, response, next);

      expect(response.json.calledWith(mock.expense.responseCreateExpense)).to.be.equal(true);
    });
  });

  describe('Quando não consegue criar a despesa', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'createExpense').throws({ message: 'Expense already exist' });
      next = sinon.spy();
    });

    after(() => {
      services.expenses.createExpense.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.expenses.createExpense(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
});