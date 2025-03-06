const crypto = require('crypto');

const hashPassword = (password, salt) => {
  const hashedPassword = crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
  return hashedPassword;
};

const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

const comparePassword = (password, storedHash, salt) => {
  const hash = hashPassword(password, salt);
  return storedHash === hash;
};

module.exports = { hashPassword, generateSalt, comparePassword };
