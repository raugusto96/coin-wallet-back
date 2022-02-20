const validateName = (name) => {
  if (name.length < 3) {
    return {
      message: 'Name have must be more to 3 characters',
    };
  }
  return true;
};

module.exports = {
  validateName,
};
