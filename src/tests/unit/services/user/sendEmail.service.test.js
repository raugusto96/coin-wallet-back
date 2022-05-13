require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');
const nodeMailer = require('../../../../api/utils/nodemailer.function');

describe('Testa a função sendEmail do service', () => {
  let spied = null;

  before(() => {
    sinon.stub(models.user, 'findByEmail').resolves(mock.user.responseFindedUser);
    spied = sinon.spy(nodeMailer, 'sendMail');
  });

  after(() => {
    models.user.findByEmail.restore();
  });

  describe('Quando encontra o email com sucesso', () => {
    it('Realiza a chamada da função "nodeMailer"', async () => {
      await services.user.sendEmail('mail@mail.com');
      expect(spied.callCount).to.be.equal(1);
    });
    it('Verifica se a função "nodeMailer" é chamada com o mesmo parametro recebido pela "sendEmail"', async () => {
      await services.user.sendEmail('mail@mail.com');
      expect(spied.calledWith('mail@mail.com')).to.be.true;
    });
  });

  describe('Quando não encontra o email', () => {
    it('Lança um erro com a mensagem "Email not registered!"', async () => {
      models.user.findByEmail.restore();
      sinon.stub(models.user, 'findByEmail').resolves(null);
      try {
        await services.user.sendEmail();
      } catch (error) {
        expect(error.message).to.be.equal('Email not registered!');
      }
    });
    it('O erro contem o status de "404"', async () => {
      try {
        await services.user.sendEmail();
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });
  });
});