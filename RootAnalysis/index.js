const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runQuery } = require("./queryDB");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", (req, res) => {
  console.log(req);
  res.json({ hello: "world" });
});

app.get("/root/:root", (req, res) => {
  const root = req.params.root;
  console.log(root);

  const description = runQuery(root);

  res.json(description);
});
