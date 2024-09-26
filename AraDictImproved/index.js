const express = require("express");
const bodyParser = require("body-parser");
const main = require("./main");

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  console.log(req.body);
  res.json({ hello: "world" });
});

app.get("/word", async (req, res) => {
  const word = req.body.word;
  const meanings = await main(word);

  res.json(meanings);
});

module.exports = app;
