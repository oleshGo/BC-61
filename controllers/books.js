const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const Book = require("../models/book");

const getAll = async (req, res, next) => {
  const { id: owner } = req.user;
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;
  // const books = await Book.find({ owner }, "-title").skip(skip).limit(limit);
  const books = await Book.find({ owner }, "-title", { skip, limit }).populate("owner", "email name");
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
  const { id } = req.user;
  const createdBook = await Book.create({ ...body, owner: id });
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
