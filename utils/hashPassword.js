const bcrypt = require("bcryptjs");
const { password } = require("pg/lib/defaults");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = { hashPassword };
