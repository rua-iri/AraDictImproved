const { runQuery } = require("./queryDB");

test("Queries for root كحلب", async () => {
  const data = await runQuery("كحلب");
  expect(data).toEqual({
    desc: "كَحْلَبٌ: اسم.",
    root: "كحلب",
  });
});

test("Queries for root ششا", async () => {
  const data = await runQuery("ششا");
  expect(data).toEqual({
    root: "ششا",
    desc: "ثعلب عن ابن الأَعرابي: الشَّشا الشِّيصُ.",
  });
});

test("Queries for root كدع", async () => {
  const data = await runQuery("كدع");
  expect(data).toEqual({
    root: "كدع",
    desc: "كَدَعَه يَكْدَعُه كَدْعاً: دَفَعَه.",
  });
});

test("Queries incorrectly for root كدع", async () => {
  const data = await runQuery("ششا");
  expect(data).not.toEqual({
    root: "كدع",
    desc: "كَدَعَه يَكْدَعُه كَدْعاً: دَفَعَه.",
  });
});
