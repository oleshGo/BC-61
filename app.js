// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const { getAll, getById, createBook, deleteById, updateBook } = require("./books");

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "getAll":
      const books = await getAll();
      return console.table(books);
    case "getById":
      const book = await getById(id);
      return console.log(book);
    case "create":
      const createdBook = await createBook({ title, author });
      return console.log(createdBook);
    case "delete":
      const deletedBook = await deleteById(id);
      return console.log(deletedBook);
    case "update":
      const updatedBook = await updateBook(id, { title, author });
      return console.log(updatedBook);
  }
};

// invokeAction({ action: "getAll" });
// invokeAction({ action: "getById", id: "u9kgwNWGi3uUUwh0b8V49" });
// invokeAction({ action: "create", title: "New boo", author: "Author" });
// invokeAction({ action: "delete", id: "U57pDNn-Ku4h07zYPMeH1" });
// invokeAction({ action: "update", id: "CTHE0f1kkWwqS5sL2tI8_", title: "Updated title", author: "Updated author" });

// const actionIndex = process.argv.findIndex((elem) => elem === "--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// const arr = hideBin(process.argv);
// const arr = process.argv.slice(2);
// const { argv } = yargs(arr);
// console.log(argv);
// invokeAction(argv);

// program.option("-a, --action <type>").option("-i, --id <type>").option("-t, --title <type>").option("-au, --author <type>");
// program.parse();
// const opts = program.opts();
// invokeAction(opts);
