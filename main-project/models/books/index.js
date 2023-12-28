const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const pathToFile = path.join(__dirname, "books.json");

const writeFile = async (data) => {
  await fs.writeFile(pathToFile, JSON.stringify(data, null, 2));
};

const getAll = async () => {
  const books = await fs.readFile(pathToFile, "utf-8");
  return JSON.parse(books);
};

const getById = async (id) => {
  const books = await getAll();
  const book = books.find((elem) => elem.id === id);
  return book || null;
};

const createBook = async (book) => {
  const books = await getAll();
  const newBook = {
    id: nanoid(),
    ...book,
  };
  books.push(newBook);
  await writeFile(books);
  return newBook;
};

const deleteById = async (id) => {
  const books = await getAll();
  const index = books.findIndex((elem) => elem.id === id);
  if (index === -1) {
    return null;
  }
  const deletedBook = books.splice(index, 1)[0];
  await writeFile(books);
  return deletedBook;
};

const updateBook = async (id, book) => {
  const books = await getAll();
  const index = books.findIndex((elem) => elem.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...book };
  await writeFile(books);
  return books[index];
};

module.exports = {
  getAll,
  getById,
  createBook,
  deleteById,
  updateBook,
};
