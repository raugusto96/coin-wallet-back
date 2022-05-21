const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');

describe('Testando a função resetPassword do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando consegue atualizar a senha com sucesso', () => {
    
      before(() => {
        sinon.stub(services.user, 'resetPassword').resolves();
        request.params = { email: 'mail@mail.com' };
        request.body = { password: '123456789' };
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns();
      });
      
      after(() => {
        services.user.resetPassword.restore();
      });

      it('Envia um status "204"', async () => {
        await controllers.user.resetPassword(request, response, next);

        expect(response.status.calledWith(StatusCodes.NO_CONTENT)).to.be.equal(true);
      });

      it('Finaliza a requisição da aplicação com um "end"', async () => {
        await controllers.user.resetPassword(request, response, next);

        expect(response.end.called).to.be.equal(true);
      });
  });

  describe('Quando não consegue atualizar a senha', () => {
    
    before(() => {
      sinon.stub(services.user, 'resetPassword').throws({ message: 'Email not registered' });
      next = sinon.spy();
    });
    
    after(() => {
      services.user.resetPassword.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.user.resetPassword(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
});