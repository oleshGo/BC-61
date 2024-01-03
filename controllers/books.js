// const booksFunctions = require("../models/books");
// const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const Book = require("../models/book");

const getAll = async (req, res, next) => {
  const books = await Book.find();
  res.json(books);
};

// const getById = async (req, res, next) => {
//   const { id } = req.params;
//   const book = await booksFunctions.getById(id);
//   if (!book) {
//     throw httpError(404, `Book with id ${id} not found`);
//   }
//   res.json(book);
// };

// const create = async (req, res, next) => {
//   const body = req.body;
//   const createdBook = await booksFunctions.createBook(body);
//   res.status(201).json(createdBook);
// };

// const updateById = async (req, res, next) => {
//   const { id } = req.params;
//   const body = req.body;
//   const updateBook = await booksFunctions.updateBook(id, body);
//   if (!updateBook) {
//     throw httpError(404, `Book with id ${id} not found`);
//   }
//   res.json(updateBook);
// };

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;
//   const deletedBook = await booksFunctions.deleteById(id);
//   if (!deletedBook) {
//     throw httpError(404, `Book with id ${id} not found`);
//   }
//   // res.json(deletedBook);
//   res.status(204);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // create: ctrlWrapper(create),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
