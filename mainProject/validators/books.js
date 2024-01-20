const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().valid("comics", "love").required(),
  date: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  createBookSchema,
  updateFavorite,
};
