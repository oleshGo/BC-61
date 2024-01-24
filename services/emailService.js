const envsConfig = require("../configs/envsConfig");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envsConfig.email,
    pass: envsConfig.gmailPass,
  },
});

const sendEmail = async (data) => {
  const email = { ...data, from: envsConfig.email };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;

// const brevo = require("@getbrevo/brevo");

// const apiInstance = new brevo.TransactionalEmailsApi();

// apiInstance.authentications.apiKey.apiKey = envsConfig.brevoApiKey;

// const email = {
//   subject: "Test",
//   sender: { email: envsConfig.email, name: "Vasyl" },
//   to: [{ email: "volesh2@gmail.com" }],
//   htmlContent: "<html><body><h2>Test message</h2></body></html>",
// };

// apiInstance.sendTransacEmail(email).then(() => {
//   console.log("Sended");
// });
