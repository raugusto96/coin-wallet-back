const sinon = require('sinon');
const { expect } = require('chai');
require('dotenv').config();

const controllers = require('../../api/controllers');
const services = require('../../api/services');
const { getConnection } = require('./connection');
const { ObjectId } = require('mongodb');
const mocks = require('../mock');
const { StatusCodes } = require('http-status-codes');

const { DB_NAME, SECRET_KEY, FIRST_COLLECTION_NAME, SECOND_COLLECTION_NAME } = process.env;


describe('Testando o user.controller', () => {
  after(() => {
    sinon.restore();
  });

  describe('Testando as funções básicas', () => {
    const res = {};
    const basicInit = () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    };
    beforeEach(basicInit);
    it('Estrutura básica', () => {
      expect(controllers.user).to.be.an('object');
      expect(controllers.user).to.have.all.keys(
        [
          'createUser', 'logIn', 'findById', 'deleteById', 'resetPassword', 'sendEmail',
        ]
      );
      Object.values(controllers.user)
        .forEach((controllerFunc) => expect(controllerFunc).to.be.an('function'));
    });
    describe('Funções de método GET', () => {
      describe('FindById funciona corretamente', () => {
        const res = {};
        const req = {};
        const next = (error) => { console.log(error) };
        let id;
        const { name, email } = mocks.user.sampleCorrectUser;
        let returnedUser;

        before(function basicInit() {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          id = ObjectId.generate();

          returnedUser = { _id: id, name, email };
          services.user.findById = sinon.stub().returns({ ...returnedUser });
        });

        it('FindById retorna corretamente', async () => {
          req.params = { id };
          await controllers.user.findById(req, res, next);

          expect(res.status.calledWith(200)).to.be.equal(true);
          expect(res.json.calledWith({ user: { ...returnedUser } })).to.be.equal(true);
        });
      });
    });
  });
});