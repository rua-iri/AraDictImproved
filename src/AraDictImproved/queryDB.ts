import type { WordCombination } from "./wordModels.js";

import sqlite3 from "sqlite3";
sqlite3.verbose();
import { open } from "sqlite";
import { WordSolution } from "./wordModels.js";

const selectQuery = `SELECT DISTINCT 
prefixes.VOC_FORM || stems.VOC_FORM || suffixes.VOC_FORM AS VOC_FORM,
prefixes.GLOSS AS PRE_GLOSS, 
stems.GLOSS AS STE_GLOSS, 
suffixes.GLOSS AS SUF_GLOSS, 
prefixes.POS_NICE || ', ' || stems.POS_NICE || ', ' || suffixes.POS_NICE AS POS, 
stems.ROOT, 
stems.MEASURE
FROM stems 
INNER JOIN tableAB 
ON stems.CAT_ID=tableAB.stemCatId 
INNER JOIN prefixes 
ON tableAB.prefCatID=prefixes.CAT_ID 
INNER JOIN tableBC 
ON stems.CAT_ID=tableBC.stemCatID 
INNER JOIN suffixes 
ON tableBC.suffCatID=suffixes.CAT_ID 
WHERE prefixes.FORM=@prefix 
AND stems.FORM=@stem 
AND suffixes.FORM=@suffix 
AND EXISTS 
(SELECT 1 
FROM tableAC 
WHERE tableAC.prefCatID=prefixes.CAT_ID 
AND tableAC.suffCatID=suffixes.CAT_ID);`;

async function runQuery(wordCombination: WordCombination) {
  const db = await open({
    filename: `data/aramorph.sqlite`,
    mode: sqlite3.OPEN_READONLY,
    driver: sqlite3.Database,
  });

  const statement = await db.prepare(selectQuery);
  const result = await statement.all({
    "@prefix": wordCombination.prefix,
    "@stem": wordCombination.stem,
    "@suffix": wordCombination.suffix,
  });

  for (let row of result) {
    let glossMeaning = row.PRE_GLOSS;

    if (row.SUF_GLOSS.includes("<verb>")) {
      glossMeaning += " " + row.SUF_GLOSS;
      glossMeaning = glossMeaning.replace("<verb>", row.STE_GLOSS);
    } else {
      glossMeaning += " " + row.STE_GLOSS;
      glossMeaning += " " + row.SUF_GLOSS;
    }

    let wordSolution = new WordSolution(
      row.VOC_FORM,
      glossMeaning,
      row.POS,
      row.ROOT,
      row.MEASURE
    );

    wordCombination.addSolution(wordSolution);
  }
}

export { runQuery };
