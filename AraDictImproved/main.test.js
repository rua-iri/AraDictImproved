const main = require("./main");

test("Searches for definition of 'they speak'", async () => {
  const data = await main("يتكلمون");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "يَتَكَلَّمُونَ",
      meaning: "they (people) speak;talk;discuss [masc.pl.]",
      tense:
        "Subject (3. person, male, plural), Imperfect tense verb, Suffixed subject (Indicative, male, plural)",
      root: "كلم",
      verbForm: "5",
    },
  ]);
});

test("Searches for definition of 'they speak' (with harakat)", async () => {
  const data = await main("يَتَكَلَّمُون");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "يَتَكَلَّمُونَ",
      meaning: "they (people) speak;talk;discuss [masc.pl.]",
      tense:
        "Subject (3. person, male, plural), Imperfect tense verb, Suffixed subject (Indicative, male, plural)",
      root: "كلم",
      verbForm: "5",
    },
  ]);
});

test("Searches for definition of 'to listen'", async () => {
  const data = await main("الاستمتاع");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "الٱِسْتِمْتاع",
      meaning: "the enjoyment ",
      tense: "Determinative, Noun",
      root: "متع",
      verbForm: "",
    },
  ]);
});

test("Searches for definition of word 'rwh'", async () => {
  const data = await main("روح");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "رَوَّحَ",
      meaning: " he/it fan;ventilate;revive",
      tense: "Perfect tense verb, Suffixed subject (3. person, male, singular)",
      root: "روح",
      verbForm: "2",
    },
    {
      phoneticSpelling: "رُوح",
      meaning: " spirit;soul ",
      tense: "Noun",
      root: "روح",
      verbForm: "",
    },
    {
      phoneticSpelling: "رَوْح",
      meaning: " repose;refreshment ",
      tense: "Noun",
      root: "روح",
      verbForm: "",
    },
  ]);
});

test("Searches for definition of word 'going'", async () => {
  const data = await main("ذاهب");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "ذاهِب",
      meaning: " going ",
      tense: "Adjective",
      root: "ذهب",
      verbForm: "",
    },
  ]);
});

test("Searches for definition of word 'smoking' (with harakat)", async () => {
  const data = await main("التَدْخِين");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "التَدْخِين",
      meaning: "the smoking;fumigating ",
      tense: "Determinative, Noun",
      root: "دخن",
      verbForm: "",
    },
  ]);
});

test("Searches for definition of word 'smoking'", async () => {
  const data = await main("التدخين");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "التَدْخِين",
      meaning: "the smoking;fumigating ",
      tense: "Determinative, Noun",
      root: "دخن",
      verbForm: "",
    },
  ]);
});

test("Searches for word ktb with many definitions", async () => {
  const data = await main("كتب");
  expect(data).toStrictEqual([
    {
      phoneticSpelling: "كَتَبَ",
      meaning: " he/it write",
      tense: "Perfect tense verb, Suffixed subject (3. person, male, singular)",
      root: "كتب",
      verbForm: "1",
    },
    {
      phoneticSpelling: "كُتِبَ",
      meaning: " he/it be written;be fated;be destined",
      tense:
        "Passive perfect tense verb, Suffixed subject (3. person, male, singular)",
      root: "كتب",
      verbForm: "",
    },
    {
      phoneticSpelling: "كُتُب",
      meaning: " books ",
      tense: "Noun",
      root: "كتب",
      verbForm: "",
    },
  ]);
});

test("Searches for word with no definitions", async () => {
  const data = await main("كشمستيب");
  expect(data).toStrictEqual([]);
});

test("Checks word does not have same meanings as similar word", async () => {
  const data = await main("يتكلمون");
  expect(data).not.toStrictEqual([
    {
      phoneticSpelling: "يَتَكَلَّم",
      meaning: "he/it speak;talk;discuss ",
      tense: "Subject (3. person, male, singular), Imperfect tense verb",
      root: "كلم",
      verbForm: "5",
    },
  ]);
});
