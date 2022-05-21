const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');
const mock = require('../../../mock');

describe('Testa a função login do controller', () => {
  
  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando o usuário loga com sucesso', () => {

    before(() => {
      sinon.stub(services.user, 'logIn').resolves(mock.user.responseCreatedData);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      services.user.logIn.restore();
    });

    it('Envia um status "200"', async () => {
      await controllers.user.logIn(request, response);

      expect(response.status.calledWith(StatusCodes.OK)).to.be.equal(true);
    });
    it('Envia o usuário que conseguiu realizar o login', async () => {
      await controllers.user.logIn(request, response);

      expect(response.json.calledWith(mock.user.responseCreatedData)).to.be.equal(true);
    });
  });

  describe('Quando não consegue realizar login', () => {
    
    before(() => {
      sinon.stub(services.user, 'logIn').throws({ message: 'Email or password do not match' });
      next = sinon.spy();
    });
    
    after(() => {
      services.user.logIn.restore();
    });

    it('Verifica se a função "next" recebe um erro como parametro', async () => {
      try {
        await controllers.user.logIn(request, response, next);
      } catch (error) {
        expect(next.calledWith(error)).to.be.equal(true);
      }
    });
  });
});