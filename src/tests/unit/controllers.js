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
    describe('FindById funciona corretamente', () => {
      let res = {};
      let req = {};
      const next = (error) => { throw error };
      let id;
      const { name, email } = mocks.user.sampleCorrectUser;
      let returnedUser;

      afterEach(() => {
        sinon.restore();
        res = {};
        req = {};
      });

      it('Deve retornar o usuário corretamente', async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        id = ObjectId.generate();
        req.params = { id };

        returnedUser = { _id: id, name, email };
        services.user.findById = sinon.stub().returns({ ...returnedUser });

        await controllers.user.findById(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith({ user: { ...returnedUser } })).to.be.equal(true);
      });

      it('Deve retornar o erro corretamente', async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        id = ObjectId.generate();
        req.params = { id };

        try {
          services.user.findById = sinon.stub().throws('User doesn\'t exist');
        } catch (error) {
          expect(error).to.throw('User doesn\'t exist');
        }    
      });

    });

    describe('CreateUser funciona corretamente', () => {
      let res = {};
      let req = {};
      const next = (error) => { throw error };

      afterEach(() => {
        sinon.restore();
        res = {};
        req = {};
      });

      it('Deve retornar o usuário criado corretamente ', async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        const email = 'email@mail.com';
        const name = 'Fulana';
        const password = '123456789';
        req.body = {
          email, name, password,
        };
        const id = ObjectId.generate();
        const returnedUser = {
          id,
          email,
          name,
          userId: 1,
        };

        services.user.createUser = sinon.stub().returns({ ...returnedUser });

        await controllers.user.createUser(req, res, next);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith({ user: returnedUser })).to.be.equal(true);

      });
    });
  });
});