const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runQuery, runQueryCount } = require("./queryDB");
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

router.get("/:dict_name/:root", async (req, res) => {
  try {
    const root = req.params.root;
    const dictName = req.params.dict_name;
    console.log(root);

    const rootData = await runQuery(root, dictName);

    if (!rootData) {
      res.status(404).send(new Response404("No Roots found"));
    } else {
      res.status(200).send(new Response200(rootData));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

router.get("/:dict_name/count/:root/", async (req, res) => {
  try {
    const root = req.params.root;
    const dictName = req.params.dict_name;

    const rootData = await runQueryCount(root, dictName);

    if (!rootData) {
      res.status(404).send(new Response404("No Roots found"));
    } else {
      res.status(200).send(new Response200(rootData));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

module.exports = router;
