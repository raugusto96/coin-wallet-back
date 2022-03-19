const mailer = require('nodemailer');
require('dotenv').config();

const {
  MAIL_USERNAME, MAIL_PASSWORD, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_REFRESH_TOKEN,
} = process.env;

module.exports = (email, name) => {
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

  const mail = {
    from: MAIL_USERNAME,
    to: email,
    subject: 'Coin Wallet Project',
    html: `<b>Olá ${name}!</b><br>
    Esse é um email para recuperar sua senha.<br>
    <a href="http://teste.com">Link de teste, não clique</a>`,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent sucessfully');
    }
  });
};
