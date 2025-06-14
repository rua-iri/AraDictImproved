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

const countQueryLanesLexicon = `
SELECT COUNT(laneslexicon.root) AS wordCount
FROM laneslexicon
WHERE laneslexicon.root = ?
AND laneslexicon.root <> laneslexicon.meaning;
`;

const countQueryHansWehr = `
SELECT COUNT(hanswehr.root) AS wordCount
FROM hanswehr
WHERE hanswehr.root = ?;
`;

async function runQuery(root, tableName) {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
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

  await conn.end();
  console.log("DB connection closed");

  return results;
}

async function runQueryCount(root, tableName) {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    user: "db_user",
    password: "password",
    database: "arabic_dictionaries",
  });

  let selectQuery;

  if (tableName == "hans") {
    selectQuery = countQueryHansWehr;
  } else if (tableName == "lane") {
    selectQuery = countQueryLanesLexicon;
  } else {
    throw new Error("Table name not found");
  }

  const [results] = await conn.query(selectQuery, [root]);

  console.log(results);

  await conn.end();
  console.log("DB connection closed");

  return results[0];
}

module.exports = { runQuery, runQueryCount };
