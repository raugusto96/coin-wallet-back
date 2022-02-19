const chai = require('chai');
const chaiHttp = require('chai-http');
const { get } = require('express/lib/response');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Test the app', () => {
  describe('Local: get "/"', () => {
    let response = {};
    it('should verify the server is on', async () => {
      response = await chai.request(server).get('/');

      return expect(response).to.have.status(200);
    });      
  });
});