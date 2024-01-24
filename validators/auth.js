const Joi = require("joi");

const registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().required(),
});

const loginUser = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
});
emailSchema;

module.exports = {
  registerUser,
  loginUser,
  emailSchema,
};
