const express = require("express");

const booksControllers = require("../../controllers/books");
const { validateBody } = require("../../decorators");
const { booksSchemas } = require("../../validators");
const { isValidMongoId } = require("../../middlewares");

const route = express.Router();

route.get("/", booksControllers.getAll);
route.post("/", validateBody(booksSchemas.createBookSchema), booksControllers.create);

route.get("/:id", isValidMongoId, booksControllers.getById);
route.put("/:id", isValidMongoId, validateBody(booksSchemas.createBookSchema), booksControllers.updateById);
route.patch("/:id/favorite", isValidMongoId, validateBody(booksSchemas.updateFavorite), booksControllers.updateFavorite);
route.delete("/:id", isValidMongoId, booksControllers.deleteById);

module.exports = route;
