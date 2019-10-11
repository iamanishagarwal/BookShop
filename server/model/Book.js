const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  userId: String,
  id: String,
  img: String,
  title: String,
  author: String,
  quantity: Number,
  price: Number
});

mongoose.model("Book", bookSchema);
