const { MongoClient, MongoServerSelectionError } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connection = null;
let mongoServer;

const getConnection = async () => {
  mongoServer = await MongoMemoryServer.create();
  const URLMock = mongoServer.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  connection = connection || MongoClient.connect(URLMock, OPTIONS);
  return connection;
};

module.exports = { getConnection };