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

const responseFindedUser = {
  email: 'mail@mail.com',
  name: 'Fulana da Silva',
  userId: 1
};

const responseDeletedData = {
  acknowledged: true,
  deletedCount: 1,
};

module.exports = {
  payloadCreateUser,
  payloadResetPassword,
  emptyPayloadResetPassword,
  responseFindedUser,
  responseDeletedData,
}