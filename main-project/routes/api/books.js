const express = require("express");

const booksControllers = require("../../controllers/books");
const { validateBody } = require("../../decorators");
const { booksSchemas } = require("../../validators");

const route = express.Router();

route.get("/", booksControllers.getAll);
route.post("/", validateBody(booksSchemas.createBookSchema), booksControllers.create);

route.get("/:id", booksControllers.getById);
route.put("/:id", validateBody(booksSchemas.createBookSchema), booksControllers.updateById);
route.delete("/:id", booksControllers.deleteById);

module.exports = route;
