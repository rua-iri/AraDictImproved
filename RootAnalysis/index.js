const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runQuery } = require("./queryDB");
const {
  Response200,
  Response404,
  Response500,
} = require("../responses/responses.js");

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.get("/hello", (req, res) => {
  console.log(req);
  res.status(200).send(new Response200({ hello: "world" }));
});

router.get("/:root", async (req, res) => {
  try {
    const root = req.params.root;
    console.log(root);

    const rootData = await runQuery(root);

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
