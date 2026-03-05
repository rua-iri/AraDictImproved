import type { WordCombination } from "./wordModels.js";

import { DatabaseSync } from "node:sqlite";
import { WordSolution } from "./wordModels.js";

const DB_NAME = "data/aramorph.sqlite";

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

function runQuery(wordCombination: WordCombination) {
  const db = new DatabaseSync(DB_NAME);
  const statement = db.prepare(selectQuery);
  const result = statement.all({
    "@prefix": wordCombination.prefix,
    "@stem": wordCombination.stem,
    "@suffix": wordCombination.suffix,
  });

  for (const row of result) {
    const stemGlossMeaning = row.STE_GLOSS as string;
    const suffixGlossMeaning = row.SUF_GLOSS as string;
    const vocalisedForm = row.VOC_FORM as string;
    let glossMeaning = row.PRE_GLOSS as string;

    if (suffixGlossMeaning.includes("<verb>")) {
      glossMeaning += " " + suffixGlossMeaning;
      glossMeaning = glossMeaning.replace("<verb>", stemGlossMeaning);
    } else {
      glossMeaning += " " + stemGlossMeaning;
      glossMeaning += " " + suffixGlossMeaning;
    }

    glossMeaning = glossMeaning.trim();

    const wordSolution = new WordSolution(
      vocalisedForm,
      glossMeaning,
      row.POS as string,
      row.ROOT as string,
      row.MEASURE as string,
    );

    wordCombination.addSolution(wordSolution);
  }
}

export { runQuery };
