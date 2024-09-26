const { SegmentedWord, WordCombination } = require("./wordModels");
const { runQuery } = require("./helpers");

// An array of the character codes for Arabic harakat
const harakatCodeArray = [
  1614, // fatha
  1611, // tanwiin fatha
  1615, // dhamma
  1612, // tanwiin dhamma
  1616, // kasra
  1613, // tanwiin kasra
  1618, // sukuun
  1617,
]; // shadda

function removeDiacritics(word) {
  let outputWord = "";
  for (let i = 0; i < word.length; i++) {
    if (!harakatCodeArray.includes(word[i].charCodeAt(0))) {
      outputWord += word[i];
    }
  }

  return outputWord;
}

function segmentWord(word) {
  let possibleSegments = new Set();
  let prefixLength = 0;
  let suffixLength = 0;

  while (prefixLength <= 4 && prefixLength < word.length) {
    let prefix = word.substring(0, prefixLength);
    let stemLength = word.length - prefixLength;
    suffixLength = 0;

    while (stemLength >= 1 && suffixLength <= 6) {
      let stem = word.substring(prefixLength, prefixLength + stemLength);
      let suffix = word.substring(
        prefixLength + stemLength,
        prefixLength + stemLength + suffixLength
      );
      possibleSegments.add(new SegmentedWord(prefix, stem, suffix));
      stemLength--;
      suffixLength++;
    }
    prefixLength++;
  }

  return possibleSegments;
}

async function runAnalyser(arabicWord) {
  // console.log("Word with harakat: " + arabicWord);
  arabicWord = removeDiacritics(arabicWord);
  // console.log("Word without harakat: " + arabicWord);

  let solutionsArray = [];

  const possibleSegments = segmentWord(arabicWord);

  for (let segment of possibleSegments) {
    let prefix = segment.prefix;
    let stem = segment.stem;
    let suffix = segment.suffix;

    let wordCombination = new WordCombination(prefix, stem, suffix);
    await runQuery(wordCombination);

    for (let solution of wordCombination.combinationSolutions) {
      solutionsArray.push(solution.toDict());
    }
  }

  // console.log(solutionsArray)
  return solutionsArray;
}

async function main(lookupWord) {
  wordMeanings = await runAnalyser(lookupWord);
  return wordMeanings;
}

// main("يتكلم")
// main("كتب")
// main("الاستمتاع")
// main("روح")
// main("ذاهب")
// main("التدخين")
// main("التَدْخِين")
// main("يتكلمون")
// main("يَتَكَلَّمُون")
// main("للتطبيق")
// main("لِلتَطْبِيق")

module.exports = main;
