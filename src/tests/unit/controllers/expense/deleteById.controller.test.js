const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');

describe('Testando a função deleteById do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando remove a despesa com sucesso', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'deleteById').resolves();
      request.params = { id: '1' };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
    });
    
    after(() => {
      services.expenses.deleteById.restore();
    });

    it('Envia um status "204"', async () => {
      await controllers.expenses.deleteById(request, response, next);

      expect(response.status.calledWith(StatusCodes.NO_CONTENT)).to.be.equal(true);
    });

    it('Finaliza a requisição da aplicação com um "end"', async () => {
      await controllers.expenses.deleteById(request, response, next);

      expect(response.end.called).to.be.equal(true);
    });
  });

  describe('Quando não encontra a despesa', () => {
    
    before(() => {
      sinon.stub(services.expenses, 'deleteById').throws({ message: 'Expense does not exist' });
      next = sinon.spy();
    });

    after(() => {
      services.expenses.deleteById.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.expenses.deleteById(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
});