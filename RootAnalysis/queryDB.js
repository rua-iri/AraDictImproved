const sqlite = require("sqlite3").verbose();
const { open } = require("sqlite");
const mysql = require("mysql2/promise");

const selectQueryLanesLexicon = `
SELECT laneslexicon.root, 
laneslexicon.word, 
laneslexicon.meaning
FROM laneslexicon
WHERE laneslexicon.root = ?;
`;

const selectQueryHansWehr = `
SELECT hanswehr.root, 
hanswehr.word, 
hanswehr.meaning 
FROM hanswehr
WHERE hanswehr.root = ?;
`;

async function runQuery(root, tableName) {
  const conn = await mysql.createConnection({
    host: "dictionary_db",
    port: "3306",
    user: "db_user",
    password: "password",
    database: "arabic_dictionaries",
  });

  let selectQuery;

  if (tableName == "hans") {
    selectQuery = selectQueryHansWehr;
  } else if (tableName == "lane") {
    selectQuery = selectQueryLanesLexicon;
  } else {
    throw new Error("Table name not found");
  }

  const [results, fields] = await conn.query(selectQuery, [root]);

  return results;
}

module.exports = { runQuery };
