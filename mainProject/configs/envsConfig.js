require("dotenv").config();

const { DB_HOST, PORT, JWT_SECRET, DB_HOST_TEST } = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
  dbHostTest: DB_HOST_TEST,
  jwtSecret: JWT_SECRET,
};
