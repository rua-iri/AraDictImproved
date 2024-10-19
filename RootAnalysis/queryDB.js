const sqlite = require("sqlite3").verbose();
const { open } = require("sqlite");

const selectQuery = `
SELECT lisan.root, lisan.desc
FROM lisan
WHERE lisan.root = @root;
`;

async function runQuery(root) {
  const db = await open({
    filename: "data/lisanalarab.sqlite",
    mode: sqlite.OPEN_READONLY,
    driver: sqlite.Database,
  });

  const statement = await db.prepare(selectQuery);
  const result = statement.all({
    "@root": root,
  });

  return result;
}

module.exports = { runQuery };
