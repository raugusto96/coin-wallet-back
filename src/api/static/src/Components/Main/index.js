import style from '../../App.module.scss';
import React from 'react'
import Section from '../Section';
import MethodCard from '../MethodCard';
import MethodExpenseCard from '../MethodExpenseCard';

const Main = () => {
  return (
    <main className={ `${style.main_content}` }>
      <h1>Portal do Desenvolvedor</h1>
      <Section
        sectionSubtitle="Visão Geral"
        id="overview"
      >
        <p>
          Este documento fornecerá uma compreensão básica do Portal de Desenvolvedor da Coin Wallet. Ele foi criado para ajudar a saber como consumi-los por meio de solicitações HTTP. A navegação pode ser encontrada na barra lateral esquerda e a barra lateral direita mostra exemplos de objetos retornados para chamadas bem-sucedidas.
        </p>
      </Section>
      <Section
        sectionSubtitle="Começando"
        id="getting-started"
      >
        <p>As requisições podem ser feitas com <code>axios</code> ou outras bibliotecas auxiliares seguindo as chamadas REST regulares.</p>
      </Section>
      <Section
        sectionSubtitle="URL Base"
        id="base-url"
      >
        <p>Os usuários devem efetuar todas as chamadas com este URL base:</p>
        <p>
          <code>https://coin-wallet-back.herokuapp.com</code>
        </p>
      </Section>
      <Section
        sectionSubtitle="Autenticação"
        id="authetication"
      >
        <p>Não é necessário chave de autorização para a Coin Wallet API.</p>
      </Section>
      <Section
        sectionSubtitle="Endpoints do Usuário"
        id="user-endpoints"
      >
      <div className={ `${style.method_cards_container}` }>
        <MethodCard
          cardTitle="Registrar um usuário"
          cardMethod="post"
          codeUrl="register"
          id="register"
          objectKeys={ Object.keys({
            "email": "email@mail.com",
            "name": "Fulana",
            "password": "123456789"
          })}
          objectValues={ Object.values({
            "email": "email@mail.com",
            "name": "Fulana",
            "password": "123456789"
          })}
        />
        <MethodCard
          cardTitle="Login de um usuário"
          cardMethod="post"
          codeUrl="login"
          isLoginEndPoint
          id="login"
          objectKeys={ Object.keys({
            "email": "email@mail.com",
            "password": "123456789"
          })}
          objectValues={ Object.values({
            "email": "email@mail.com",
            "password": "123456789"
          })}
        />
        <MethodCard
          cardTitle="Requisitar um usuário"
          cardMethod="get"
          codeUrl="user/623d01542e31b56a4d892af3"
          id="get-user"
          isGetMethod
          />
        <MethodCard
          cardTitle="Deletar um usuário"
          isGetMethod
          cardMethod="del"
          codeUrl="user/623d01542e31b56a4d892af3"
          id="delete-user"
        />
        <MethodCard
          cardTitle="Resetar senha"
          cardMethod="post"
          codeUrl="reset-password"
          isResetPasswordEndPoint
          isLoginEndPoint
          id="reset-password"
          objectKeys={ Object.keys({
            "email": "email@mail.com",
          })}
          objectValues={ Object.values({
            "email": "email@mail.com",
          })}
        />
        <MethodCard
          cardTitle="Editar senha"
          cardMethod="put"
          codeUrl="email@mail.com/reset-password"
          isResetPasswordEndPoint
          isLoginEndPoint
          id="edit-password"
          objectKeys={ Object.keys({
            "password": "123456789",
          })}
          objectValues={ Object.values({
            "password": "123456789",
          })}
        />
      </div>
      </Section>
      <Section
        sectionSubtitle="Endpoints das Despesas"
        id="expense-endpoints"
      >
        <div className={ `${style.method_cards_container}` }>
          <MethodExpenseCard
          cardTitle="Criar uma despesa"
          cardMethod="post"
          codeUrl="1/create-expense"
          id="create-expense"
          objectKeys={ Object.keys({
            value: 30,
            title: "Comprar pão",
            type: "withdraw",
            category: "Alimentação",
            date: "20/03/2022"
          })}
          objectValues={ Object.values({
            value: 30,
            title: "Comprar pão",
            type: "withdraw",
            category: "Alimentação",
            date: "20/03/2022"
          })}
          />
          <MethodExpenseCard
          cardTitle="Deletar uma despesa"
          cardMethod="del"
          codeUrl="expenses/623d00a464b14ad3b6486f9c"
          id="delete-expense"
          isGetMethod
          />
          <MethodExpenseCard
          cardTitle="Editar uma despesa"
          cardMethod="put"
          codeUrl="expenses/623d00a464b14ad3b6486f9c"
          id="edit-expense"
          objectKeys={ Object.keys({
            "title": "Comprar gasolina",
            "value": 120,
            "category": "Transporte",
            "type": "withdraw"
          })}
          objectValues={ Object.values({
            "title": "Comprar gasolina",
            "value": 120,
            "category": "Transporte",
            "type": "withdraw"
          })}
          />
          <MethodExpenseCard
          cardTitle="Requisitar uma despesa"
          cardMethod="get"
          codeUrl="expenses"
          id="get-expense"
          isGetMethod
          />
        </div>
      </Section>
    </main>
  )
}

export default Main