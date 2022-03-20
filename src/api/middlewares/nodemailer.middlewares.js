const mailer = require('nodemailer');
require('dotenv').config();

const {
  MAIL_USERNAME, MAIL_PASSWORD, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_REFRESH_TOKEN,
} = process.env;

module.exports = (req, _res, next) => {
  const { name, email } = req.body;
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      refreshToken: AUTH_REFRESH_TOKEN,
    },
  });

  const mailText = /* html */`
  <p>Caro(a) <b>${name}</b>,<br>
  você solicitou a recuperação de sua senha de acesso ao sistema do Coin Wallet.<br>
  Clique no link abaixo para cadastrar a nova senha:<br>
  <a href="http://localhost:3000/${email}/reset-password">Recuperar minha senha</a></p>
  <p>Caso seu cliente de email não permita clicar no link acima, copie e cole o endereço abaixo no seu navegador de internet:<br>
  http://localhost:3000/${email}/reset-password</p>
  <h5>Favor não responder à este email. Essa é uma mensagem automática.</h5>
  `;

  const mail = {
    from: MAIL_USERNAME,
    to: email,
    subject: 'Coin Wallet - Recuperação de Senha',
    html: mailText,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent sucessfully');
    }
  });
  next();
};
