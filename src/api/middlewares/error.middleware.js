const { StatusCodes } = require('http-status-codes');

module.exports = async (error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  console.log(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};
