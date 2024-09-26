const express = require("express");
const bodyParser = require("body-parser");
const runAnalyser = require("./analyser");

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  console.log(req.body);
  res.json({ hello: "world" });
});

app.get("/word", async (req, res) => {
  const word = req.body.word;
  console.log(word);

  const meanings = await runAnalyser(word);

  res.json(meanings);
});

module.exports = app;
