import { SegmentedWord, WordCombination } from "./wordModels.js";
import { SqliteDB } from "./SqliteDB.js";
import { harakatCodeArray } from "./constants.js";

function removeDiacritics(word: string) {
  let outputWord = "";
  for (let i = 0; i < word.length; i++) {
    if (!harakatCodeArray.includes(word.charAt(i).charCodeAt(0))) {
      outputWord += word[i];
    }
  }

  return outputWord;
}

function segmentWord(word: string): Set<SegmentedWord> {
  const possibleSegments: Set<SegmentedWord> = new Set();
  let prefixLength = 0;
  let suffixLength = 0;

  while (prefixLength <= 4 && prefixLength < word.length) {
    const prefix = word.substring(0, prefixLength);
    let stemLength = word.length - prefixLength;
    suffixLength = 0;

    while (stemLength >= 1 && suffixLength <= 6) {
      const stem = word.substring(prefixLength, prefixLength + stemLength);
      const suffix = word.substring(
        prefixLength + stemLength,
        prefixLength + stemLength + suffixLength,
      );
      possibleSegments.add(new SegmentedWord(prefix, stem, suffix));
      stemLength--;
      suffixLength++;
    }
    prefixLength++;
  }

  return possibleSegments;
}

async function runAnalyser(arabicWord: string): Promise<Array<object>> {
  arabicWord = removeDiacritics(arabicWord);
  const sqliteDB = new SqliteDB();

  const solutionsArray = [];

  const possibleSegments = segmentWord(arabicWord);

  for (const segment of possibleSegments) {
    const prefix = segment.prefix;
    const stem = segment.stem;
    const suffix = segment.suffix;

    const wordCombination = new WordCombination(prefix, stem, suffix);
    sqliteDB.queryWordMeanings(wordCombination);

    for (const solution of wordCombination.combinationSolutions) {
      solutionsArray.push(solution.toDict());
    }
  }

  return solutionsArray;
}

export { runAnalyser, removeDiacritics };
