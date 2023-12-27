const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
// const cors = require("cors");
const booksRouter = require("./routes/books-route");
// const books = require("./books");

const app = express();

// app.get("/", (req, res) => {
//   console.log(req.method);
//   console.log(req.url);

//   res.send("<h2>Home Page</h2>");
// });

// app.get("/contacts", (req, res) => {
//   console.log(req.method);
//   console.log(req.url);

//   res.send("<h2>Contacts Page</h2>");
// });

// app.use(cors());

app.use((req, res, next) => {
  console.log("Middleware running");
  next();
});

app.use(async (req, res, next) => {
  const { method, url } = req;
  const time = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("./logging.txt", `${method} ${url} - ${time}\n`);
  next();
});

// app.get("/books", (req, res) => {
//   res.json(books);
// });

// app.use((req, res) => {
//   res.status(404).json({ message: "Page not found" });
// });

app.use("/books", booksRouter);

// // app.use('/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(4000, () => {
  console.log("Server running");
});
