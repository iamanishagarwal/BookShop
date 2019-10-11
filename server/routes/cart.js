const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Book = mongoose.model("Book");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  let books = await Book.find({ userId: req._id });
  res.send(books);
});

router.post("/book", auth, async (req, res) => {
  let book = new Book({
    userId: req._id,
    id: req.body.book.id,
    img: req.body.book.img,
    title: req.body.book.title,
    author: req.body.book.author.toString(),
    quantity: req.body.book.quantity,
    price: req.body.book.price
  });
  try {
    book = await book.save();
    if (book) res.send("Success");
  } catch (er) {
    res.send("Something went wrong");
    console.log(er);
  }
});

router.post("/book/search", auth, async (req, res) => {
  try {
    let book = await Book.find({ userId: req._id, id: req.body.id });
    res.send("Success");
  } catch (er) {
    console.log(er);
    res.send("Not Found");
  }
});

router.patch("/book/id", auth, async (req, res) => {});

module.exports = router;
