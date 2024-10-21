const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runAnalyser } = require("./analyser");

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.get("/hello", (req, res) => {
  console.log(req.body);
  res.json({ hello: "world" });
});

router.get("/:word", async (req, res) => {
  const word = req.params.word;
  console.log(word);

  const meanings = await runAnalyser(word);

  res.json(meanings);
});

module.exports = router;
