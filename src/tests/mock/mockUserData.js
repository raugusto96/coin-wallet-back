const payloadCreateUser = {
  email: "fulano@mail.com",
  name: "Fulano da Silva",
  password: "Fulano@123",
};

const payloadResetPassword = {
  email: 'fulano@mail.com',
  password: "123@Fulano",
};

const emptyPayloadResetPassword = { email: '', password: '' };

module.exports = {
  payloadCreateUser,
  payloadResetPassword,
  emptyPayloadResetPassword,
}