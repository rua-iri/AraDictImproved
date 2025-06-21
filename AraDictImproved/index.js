const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runAnalyser } = require("./analyser");
const {
  Response200,
  Response404,
  Response500,
} = require("../responses/responses.js");

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.get("/health", (req, res) => {
  try {
    res.status(200).send(new Response200({ status: "ok" }));
  } catch (error) {
    res.status(500).send(new Response500());
  }
});

router.get("/:word", async (req, res) => {
  try {
    const word = req.params.word;
    console.log(word);

    const meanings = await runAnalyser(word);

    if (meanings.length == 0) {
      res.status(404).send(new Response404("No words found"));
    } else {
      res.status(200).send(new Response200(meanings));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

module.exports = router;
