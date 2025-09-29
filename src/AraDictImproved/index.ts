import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runAnalyser } from "./analyser.js";
import {
  Response200,
  Response404,
  Response500,
} from "../responses/responses.js";

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.get("/health", (req: Request, res: Response) => {
  try {
    return res.status(200).send(new Response200({ status: "ok" }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(new Response500());
  }
});

router.get("/:word", async (req: Request, res: Response) => {
  try {
    const word: string | undefined = req.params.word;
    console.log(word);

    if (typeof word === "undefined") {
      return res.status(404).send(new Response404("No word provided"));
    }

    const meanings: Array<object> = await runAnalyser(word);

    if (meanings.length == 0) {
      return res.status(404).send(new Response404("No words found"));
    } else {
      return res.status(200).send(new Response200(meanings));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(new Response500());
  }
});

export default router;
