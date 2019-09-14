const express = require("express");
const fetch = require("node-fetch");
const keys = require("../config/keys");
const router = express.Router();

const baseUrl = "https://www.googleapis.com/books/v1/volumes";

router.get("/search/term", (req, res) => {
  const searchTerm = req.query.searchTerm;
  fetch(
    `${baseUrl}?q=${searchTerm}&key=${keys.googleApiKey}&startIndex=0&maxResults=6&printType=books`
  )
    .then(response => response.json())
    .then(result => {
      arr = result.items.map(item => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle,
          author: item.volumeInfo.authors.toString(),
          img: item.volumeInfo.imageLinks.smallThumbnail
        };
      });
      res.send(arr);
    })
    .catch(err => {
      console.log(err);
      res.send("Error");
    });
});

router.get("/search/id", (req, res) => {
  const id = req.query.id;
  fetch(`${baseUrl}/${id}?key=${keys.googleApiKey}`)
    .then(response => response.json())
    .then(result => res.send(result))
    .catch(err => {
      console.log(err);
      res.send("Error");
    });
});

module.exports = router;
