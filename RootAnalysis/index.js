const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runQuery } = require("./queryDB");

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.get("/hello", (req, res) => {
  console.log(req);
  res.json({ hello: "world" });
});

router.get("/:root", async (req, res) => {
  const root = req.params.root;
  console.log(root);

  const description = await runQuery(root);

  res.json(description);
});

module.exports = router;
