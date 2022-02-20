const validateName = (name) => {
  if (name.length < 3) return { message: 'Name have must be more to 3 characters' };
  return true;
};

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const isValidEmail = emailRegex.test(email);
  if (isValidEmail) return { message: 'Email is not valid' };
  return true;
};

module.exports = {
  validateName,
  validateEmail,
};
