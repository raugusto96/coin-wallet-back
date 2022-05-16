const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../../api/services');
const models = require('../../../../api/models');
const mock = require('../../../mock');

describe('Testa a função getAllExpenses do service', () => {

  describe('Quando não encontra o usuário', () => {
    
    before(() => {
      sinon.stub(models.user, 'findByUserId').resolves(null);
    });

    after(() => {
      models.user.findByUserId.restore();
    });

    it('Lança um erro com o status "404"', async () => {
      try {
        await services.expenses.getAllExpensesByUser();
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });

    it('Lança um erro com a mensagem "User doesn\'t exist"', async () => {
      try {
        await services.expenses.getAllExpensesByUser();
      } catch (error) {
        expect(error.message).to.match(/user doesn\'t exist/i);
      }
    });
  });

  describe('Quando encontra o usuário que possui despesas', () => {
    
    before(() => {
      sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
      sinon.stub(models.expense, 'getAllExpenses').resolves(mock.expense.responseExpensesData);
    });
  
    after(() => {
      models.user.findByUserId.restore();
      models.expense.getAllExpenses.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await services.expenses.getAllExpensesByUser(1);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto contendo as chaves "userId", "email", "name", "expenses"', async () => {
      const response = await services.expenses.getAllExpensesByUser(1);
      expect(response).to.have.all.keys(['userId', 'email', 'name', 'expenses']);
    });
    it('Retorna um objeto que contem a chave "expenses" que é um array', async () => {
      const { expenses } = await services.expenses.getAllExpensesByUser(1);
      expect(expenses).to.be.an('array');
    });
    it('Espera que a propriedade "expenses" não seja vazio', async () => {
      const { expenses } = await services.expenses.getAllExpensesByUser(1);
      expect(expenses).to.have.length(1);
    });
    it('Espera que a propriedade "expenses" possua objetos com as chaves "category", "type", "value", "title", "userId"', async () => {
      const { expenses } = await services.expenses.getAllExpensesByUser(1);
      expenses.forEach((expense) => expect(expense).to.have.all.keys(['category', 'type', 'value', 'title', 'userId']));
    });
  });

  describe('Quando encontra um usuário que não possui despesas', () => {
    
    before(() => {
      sinon.stub(models.user, 'findByUserId').resolves(mock.user.responseFindedUser);
      sinon.stub(models.expense, 'getAllExpenses').resolves([]);
    });

    after(() => {
      models.user.findByUserId.restore();
      models.expense.getAllExpenses.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await services.expenses.getAllExpensesByUser(1);
      expect(response).to.be.an('object');
    });
    it('Retorna um objeto contendo as chaves "userId", "email", "name", "expenses"', async () => {
      const response = await services.expenses.getAllExpensesByUser(1);
      expect(response).to.have.all.keys(['userId', 'email', 'name', 'expenses']);
    });
    it('Retorna um objeto que contem a chave "expenses" que é um array', async () => {
      const { expenses } = await services.expenses.getAllExpensesByUser(1);
      expect(expenses).to.be.an('array');
    });
    it('Espera que a propriedade "expenses" esteja vazia', async () => {
      const { expenses } = await services.expenses.getAllExpensesByUser(1);
      expect(expenses).to.be.empty;
    });
  });
});