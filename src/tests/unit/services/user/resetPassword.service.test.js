const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const bcrypt = require('bcrypt');

describe('Testando a função resetPassword do service', () => {
  let spied = null;

  before(() => {
    sinon.stub(models.user, 'resetPassword').returns(mock.user.responseUpdatedData);
    spied = sinon.spy(bcrypt, 'hashSync');
  });

  describe('Quando altera a senha com sucesso', () => {
    it('Verifica se chamou a função "hashSync" do modulo bcrypt', async () => {
      await services.user.resetPassword('mail@mail.com', '123456789');

      expect(spied.callCount).to.be.equal(1);
    });
    it('Verifica se chamou a função "hashSync" com os parametros "mail@mail.com" e "10"', async () => {
      await services.user.resetPassword('mail@mail.com', '123456789');
      expect(spied.calledWith('123456789', 10));
    });
  });
});