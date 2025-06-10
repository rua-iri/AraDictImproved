const sqlite = require("sqlite3").verbose();
const mysql = require("mysql2");
const { open } = require("sqlite");

const selectQuery = `
SELECT lisan.root, lisan.desc
FROM lisan
WHERE lisan.root = @root;
`;

const selectQueryMySQL = `
SELECT *
FROM laneslexicon
WHERE laneslexicon.root = ?;
`;

async function runQueryMySQL(root) {
  const conn = await mysql.createConnection({
    host: "dictionary_db",
    port: "3307",
    user: "db_user",
    password: "password",
    database: "arabic_dictionaries",
  });
  const [results, fields] = conn.query(selectQueryMySQL, [root]);

  return results;
}

async function runQuery(root) {
  const db = await open({
    filename: "data/lisanalarab.sqlite",
    mode: sqlite.OPEN_READONLY,
    driver: sqlite.Database,
  });

  const statement = await db.prepare(selectQuery);
  const result = statement.get({
    "@root": root,
  });

  return result;
}

module.exports = { runQuery, runQueryMySQL };
