# Bem vindos ao repositório de Back do projeto Coin Wallet

# Contexto

Esse é um projeto pessoal que foi desenvolvido enquanto pessoa estudante da [Trybe](https://www.betrybe.com/)

A proposta era desenvolver uma aplicação backend para uma carteira de controle financeiro, abrangindo usuários e despesas.

As únicas informações que eu tinha na hora de criar o projeto foram os campos minimos que a aplicação deveria abordar, sendo elas:


| Usuário     |  Tipo de dado | Despesa       | Tipo de dado
| :---------- |  :----------: | ------------: | :-----:
| Nome        | `string`      | Título        | `string`
| Email       | `string`      | Valor         | `Number`
| Senha       | `string`      | Tipo          | `string`
|             |               | Categoria     | `string`

---
# Como instalar

### Pre-requisitos para rodar o projeto:
- mongoDB
- NPM

Copie o ssh do projeto `git@github.com:raugusto96/coin-wallet-back.git`

  - Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:
    - `git clone git@github.com:raugusto96/coin-wallet-back.git`
    - `cd coin-wallet-back`
    - `npm install`
    - `npm start`

A aplicação está configurada para rodar na porta local 4000. Caso deseje utilizar outra porta utilize o arquivo `.env.example` para trocar para a porta desejada. Após a alteração renomeie o arquivo para `.env`

---

# Modo de utilização

A API consta com 3 rotas:
- `/` => caso alguém acesse via browser [`GET`]
- `/user` => para as funcionalidades da rota de usuário
  -  `/register` [`POST`] => Registra um novo usuário
  -  `/login` [`POST`] => Realiza o login de um usuário cadastrado previamente
  -  `/:id` [`GET`] => Pega um usuário de acordo com o id passado via url
  -  `/:id` [`DELETE`] => Deleta um usuário de acordo com o id passado via url
  -  `/:email/reset-password` [`PUT`] => Requisita uma alteração de email baseado no email passado via url
  -  `/reset-password` [`POST`] => Envia um email para solitação de troca de email
-  `/expenses` => para as funcionalidades de despesas
   -  `/:userId/create-expense` [`POST`] => Cria uma nova despesa de acordo com o `userId` passado via url
   -  `/:id` [`DELETE`] => Deleta uma despesa de acordo com o `id` passado via url
   -  `/:id` [`PUT`] => Edita uma despesa de acordo com o `id` passado via url
   -  `/:userId` [`GET`] => Pega todas as despesas de um usuário de acordo com seu `id` passado via url