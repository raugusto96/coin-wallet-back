# Bem vindos ao repositório de Backend do projeto Coin Wallet

## Contexto

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

## Modo de utilização

A API consta com 3 rotas:
- `/` => caso alguém acesse via browser [`GET`]
- `/user` => para as funcionalidades da rota de usuário
  -  `/register` [`POST`] => Registra um novo usuário
  -  `/login` [`POST`] => Realiza o login de um usuário cadastrado previamente
  -  `/:id` [`GET`] => Pega um usuário de acordo com o `id` passado via url
  -  `/:id` [`DELETE`] => Deleta um usuário de acordo com o `id` passado via url
  -  `/:email/reset-password` [`PUT`] => Requisita uma alteração de email baseado no `email` passado via url
  -  `/reset-password` [`POST`] => Envia um email para solitação de troca de email
-  `/expenses` => para as funcionalidades de despesas
   -  `/:userId/create-expense` [`POST`] => Cria uma nova despesa de acordo com o `userId` passado via url
   -  `/:id` [`DELETE`] => Deleta uma despesa de acordo com o `id` passado via url
   -  `/:id` [`PUT`] => Edita uma despesa de acordo com o `id` passado via url
   -  `/:userId` [`GET`] => Pega todas as despesas de um usuário de acordo com seu `id` passado via url
---

## Modo de desenvolvimento

O projeto foi desenvolvido e posteriormente foram implementados testes unitários.

---

## Tecnologias

Foi utilizado para o desenvolvimento desse projeto:

### Stacks

- NodeJS
- Express
- Mocha
- Chai
- Dotenv
- Cors
- JWT
- http-status-codes
- Nodemon
- Nodemailer
- ESLint
- BCrypt

### Banco de dados

O banco escolhido para a aplicação foi `Atlas MongoDB`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura, pela robustes para lidar com grande volume de requisições e pelo armazenamento em nuvem.

---
## Cobertura de Testes

A atual cobertura de testes é de:

- `100%` das linhas;

![Cobertura de testes unitários](./images/Coverage.png)
---

## Próximos passos

- [x] Deploy no Heroku
- [x] Implementação de cobertura de testes utilizando [NYC](https://www.npmjs.com/package/nyc)
- [ ] Implementação de testes de integração

---

## Contatos

### Rodrigo Augusto (Rod)

- [Linkedin](https://www.linkedin.com/in/roh-augusto96/)
- [Github](https://github.com/raugusto96)
- Email: rodrigoaugusto96@outlook.com
