import express, {type Request, type Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runQuery, runQueryCount } from "./queryDB.js";
import { getCache, setCache } from "../utils/cache.js";
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
    res.status(200).send(new Response200({ status: "ok" }));
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

router.get("/:dict_name/:root", async (req: Request, res: Response) => {
  try {
    const root = req.params.root;
    const dictName = req.params.dict_name;
    console.log(root);
    const cacheKey = `root:${dictName}:${root}`;

    const cacheValue = getCache(cacheKey);

    if (cacheValue[cacheKey]) {
      res.status(200).send(new Response200(cacheValue[cacheKey]));
    } else {
      console.log("No cached value found");
    }

    const rootData = await runQuery(root, dictName);

    if (!rootData) {
      res.status(404).send(new Response404("No Roots found"));
    } else {
      setCache(cacheKey, rootData);
      res.status(200).send(new Response200(rootData));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

router.get("/:dict_name/count/:root/", async (req: Request, res: Response) => {
  try {
    const root = req.params.root;
    const dictName = req.params.dict_name;
    const cacheKey = `root:${dictName}:${root}`;

    const cacheValue = getCache(cacheKey);

    if (cacheValue[cacheKey]) {
      res.status(200).send(new Response200(cacheValue[cacheKey]));
    } else {
      console.log("No cached value found");
    }

    const rootData = await runQueryCount(root, dictName);

    if (!rootData) {
      res.status(404).send(new Response404("No Roots found"));
    } else {
      setCache(cacheKey, rootData);
      res.status(200).send(new Response200(rootData));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new Response500());
  }
});

export default router;
