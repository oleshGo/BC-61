require("dotenv").config();

const { DB_HOST, PORT, JWT_SECRET, DB_HOST_TEST, BREVO_API_KEY, EMAIL, GMAIL_PASS, BASE_URL } = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
  dbHostTest: DB_HOST_TEST,
  jwtSecret: JWT_SECRET,
  brevoApiKey: BREVO_API_KEY,
  email: EMAIL,
  gmailPass: GMAIL_PASS,
  baseUrl: BASE_URL,
};
