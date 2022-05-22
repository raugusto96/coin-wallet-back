const mailer = require('nodemailer');
require('dotenv').config();

const {
  MAIL_USERNAME, MAIL_PASSWORD
} = process.env;

module.exports = {
  sendMail: (email) => {
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    const mailText = /* html */`
    Você solicitou a recuperação de sua senha de acesso ao sistema do Coin Wallet.<br>
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

    transporter.sendMail(mail);
  }
};
