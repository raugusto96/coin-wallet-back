const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const controllers = require('../../../../api/controllers');
const mock = require('../../../mock');

describe('Testando a função createUser do controller', () => {

  const request = {};
  const response = {};
  let next = () => {};

  describe('Quando o usuário é criado com sucesso', () => {

    before(() => {
      sinon.stub(services.user, 'createUser').resolves(mock.user.responseCreatedData);
      request.body = {
        email: 'mail@mail.com',
        name: 'Fulana da Silva',
        password: '123456789',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    
    after(() => {
      services.user.createUser.restore();
    });

    it('Envia um status "201"', async () => {
      await controllers.user.createUser(request, response, next);

      expect(response.status.calledWith(StatusCodes.CREATED)).to.be.equal(true);
    });

    it('Envia um usuário ao finalizar a requisição', async () => {
      await controllers.user.createUser(request, response, next);

      expect(response.json.calledWith(mock.user.responseCreatedData)).to.be.equal(true);
    });
  });

  describe('Quando o usuário não é criado', () => {
    
    before(() => {
      sinon.stub(services.user, 'createUser').throws({ message: 'User already exist' });
      next = sinon.spy();
    });
    
    after(() => {
      services.user.createUser.restore();
    });

    it('Verifica se a função "next" foi chamada', async () => {
      await controllers.user.createUser(request, response, next);

      expect(next.calledOnce).to.be.equal(true);
    });
  });
});