const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');
const mock = require('../../../mock');

describe('Testando a função getAllExpensesByUser do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando encontra a despesa com sucesso', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'getAllExpensesByUser').resolves(mock.expense.responseAllExpenses);
      request.params = { userId: '1' };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    
    after(() => {
      services.expenses.getAllExpensesByUser.restore();
    });

    it('Envia um status "200"', async () => {
      await controllers.expenses.getAllExpensesByUser(request, response, next);

      expect(response.status.calledWith(StatusCodes.OK)).to.be.equal(true);
    });

    it('Envia um usuário com sua despesa ao finalizar a requisição', async () => {
      await controllers.expenses.getAllExpensesByUser(request, response, next);

      expect(response.json.calledWith(mock.expense.responseAllExpenses)).to.be.equal(true);
    });
  });

  describe('Quando não encontra a despesa', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'getAllExpensesByUser').throws({ message: 'User does not exist' });
      next = sinon.spy();
    });

    after(() => {
      services.expenses.getAllExpensesByUser.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.expenses.getAllExpensesByUser(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
});