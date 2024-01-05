const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    genre: {
      type: String,
      enum: ["comics", "love"],
      required: true,
    },
    date: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

bookSchema.post("save", handleMongooseError);

const Book = model("book", bookSchema);

module.exports = Book;
