const sqlite = require("sqlite3").verbose();
const { open } = require("sqlite");

const selectQuery = `
SELECT lisan.root, lisan.desc
FROM lisan
WHERE lisan.root = @root;
`



