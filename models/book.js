const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: String,
  author: String,
});

const Book = model("book", bookSchema);

module.exports = Book;
