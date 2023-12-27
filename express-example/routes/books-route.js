const express = require("express");
const books = require("../books");

const router = express.Router();

const midleware = (req, res, next) => {
  console.log(1234);
  next();
};

router.get("/first", midleware, (req, res) => {
  res.json({ first: "obj" });
});

router.get("/first/id", (req, res) => {
  res.json({ first: "obj" });
});

router.get("/", (req, res) => {
  res.json(books);
});

module.exports = router;
