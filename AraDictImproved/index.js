const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runAnalyser } = require("./analyser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", (req, res) => {
  console.log(req.body);
  res.json({ hello: "world" });
});

app.get("/word/:word", async (req, res) => {
  const word = req.params.word;
  console.log(word);

  const meanings = await runAnalyser(word);

  res.json(meanings);
});

module.exports = app;
