require("dotenv").config();
const express = require("express");
const app = express();

const araDictRouter = require("./AraDictImproved");
const rootAnalysisRouter = require("./RootAnalysis");

const port = process.env.PORT || "3000";

console.log(`Server Running on port: ${port}`);

app.use("/word", araDictRouter);

app.use("/root", rootAnalysisRouter);

app.listen(port);
