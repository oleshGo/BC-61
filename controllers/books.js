// const booksFunctions = require("../models/books");
const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const Book = require("../models/book");

const getAll = async (req, res, next) => {
  // const books = await Book.find({}, "-title").limit(2).skip(2);
  const books = await Book.find({}, "-title");
  res.json(books);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  // const book = await Book.findOne({ title: tiltle });
  const book = await Book.findById(id);
  if (!book) {
    throw httpError(404, `Book with id ${id} not found`);
  }
  res.json(book);
};

const create = async (req, res, next) => {
  const body = req.body;
  const createdBook = await Book.create(body);
  res.status(201).json(createdBook);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updateBook = await Book.findByIdAndUpdate(id, body, { new: true });
  if (!updateBook) {
    throw httpError(404, `Book with id ${id} not found`);
  }
  res.json(updateBook);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updateBook = await Book.findByIdAndUpdate(id, body, { new: true });
  if (!updateBook) {
    throw httpError(404, `Book with id ${id} not found`);
  }
  res.json(updateBook);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw httpError(404, `Book with id ${id} not found`);
  }
  res.json(deletedBook);
  // res.status(204).send();
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
