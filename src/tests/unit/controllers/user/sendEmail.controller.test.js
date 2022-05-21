const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');

describe('Testa a função sendEmail do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando consegue enviar o email com sucesso', () => {
    
    before(() => {
      sinon.stub(services.user, 'sendEmail').resolves(true);
      request.body = { email: 'mail@mail.com' };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
    });
    
    after(() => {
      services.user.sendEmail.restore();
    });
    
    it('Envia um status "204"', async () => {
      await controllers.user.sendEmail(request, response, next);

      expect(response.status.calledWith(StatusCodes.NO_CONTENT)).to.be.equal(true);
    });
    it('Finaliza a requisição', async () => {
      await controllers.user.sendEmail(request, response, next);

      expect(response.end.called).to.be.equal(true);
    });
  });

  describe('Quando não consegue enviar o email', () => {
    
    before(() => {
      sinon.stub(services.user, 'sendEmail').throws({ message: 'Email not exists'});
    });
    
    after(() => {
      services.user.sendEmail.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      next = sinon.spy();
      await controllers.user.sendEmail(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});