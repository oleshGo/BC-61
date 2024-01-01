const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

module.exports = {
  createBookSchema,
};
