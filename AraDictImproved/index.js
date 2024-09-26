const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  console.log(req);
  res.json({ hello: "world" });
});

module.exports = app;
