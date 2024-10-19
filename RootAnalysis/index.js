const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runAnalyser } = require("./analyser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("hello", (req, res) => {
  console.log(req);
  res.json({hello: "world"});
})

