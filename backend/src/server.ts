import dotenv from "dotenv";
dotenv.config();

import express from "express"
const app = express();

import araDictRouter from "./AraDictImproved/index.js"
import rootAnalysisRouter from "./RootAnalysis/index.js"

const port: string = process.env.PORT || "3000";

console.log(`Server Running on port: ${port}`);

app.use("/word", araDictRouter);

app.use("/root", rootAnalysisRouter);

app.listen(port);
