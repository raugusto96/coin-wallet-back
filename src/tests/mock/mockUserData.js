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

const responseHashSync = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';

const responseUpdatedData = {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: null,
  matchedCount: 1,
};

const payloadLoginData = {
  email: 'mail@mail.com',
  password: '12E456789@',
};

module.exports = {
  payloadCreateUser,
  payloadResetPassword,
  emptyPayloadResetPassword,
  responseFindedUser,
  responseDeletedData,
  responseHashSync,
  responseUpdatedData,
  payloadLoginData,
}