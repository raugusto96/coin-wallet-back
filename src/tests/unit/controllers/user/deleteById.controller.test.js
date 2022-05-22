const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');

describe('Testando a função deleteById do controller', () => {

  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando consegue remover o usuário', () => {
    
    before(() => {
      sinon.stub(services.user, 'deleteById').resolves();
      request.params = { id: '1' };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
    });
    
    after(() => {
      services.user.deleteById.restore();
    });
    
    it('Envia um status "204"', async () => {
      await controllers.user.deleteById(request, response, next);

      expect(response.status.calledWith(StatusCodes.NO_CONTENT)).to.be.equal(true);
    });

    it('Finaliza a requisição da aplicação com um "end"', async () => {
      await controllers.user.deleteById(request, response, next);

      expect(response.end.called).to.be.equal(true);
    });
  });
  
  describe('Quando não consegue remover o usuário', () => {
    
    before(() => {
      sinon.stub(services.user, 'deleteById').throws({ message: 'User does not exist' });
      next = sinon.spy();
    });
    
    after(() => {
      services.user.deleteById.restore();
    });
    
    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.user.deleteById(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
  
});