const mysql = require("mysql2/promise");

const selectQueryLanesLexicon = `
SELECT laneslexicon.root, 
laneslexicon.word, 
laneslexicon.meaning
FROM laneslexicon
WHERE laneslexicon.root = ?
AND laneslexicon.root <> laneslexicon.meaning;
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
    host: process.env.DB_HOSTNAME || "dictionary_db",
    port: process.env.DB_PORT || "3307",
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

  const [results] = await conn.query(selectQuery, [root]);

  return results;
}

module.exports = { runQuery };
