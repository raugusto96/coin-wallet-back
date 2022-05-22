const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');
const mock = require('../../../mock');

describe('Testando a função findById do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando encontra o usuário corretamente', () => {
    
    before(() => {
      sinon.stub(services.user, 'findById').resolves(mock.user.responseFindedUser);
      request.params = { id: '1' };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    
    after(() => {
      services.user.findById.restore();
    });

    it('Envia um status "200"', async () => {
      await controllers.user.findById(request, response, next);

      expect(response.status.calledWith(StatusCodes.OK)).to.be.equal(true);
    });
    
    it('Envia um objeto ao final da requisição', async () => {
      await controllers.user.findById(request, response, next);

      expect(response.json.calledWith(mock.user.responseFindedUser)).to.be.equal(true);
    });

  });
  
  describe('Quando não encontra o usuário', () => {
    
    before(() => {
      sinon.stub(services.user, 'findById').throws({ message: 'User does not exist' });
      next = sinon.spy();
    });
    
    after(() => {
      services.user.findById.restore();
    });
    
    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.user.findById(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });

});