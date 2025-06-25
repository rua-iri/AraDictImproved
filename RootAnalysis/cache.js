const { createClient } = require("redis");

function getCache(key) {
  const client = createClient();
  client.connect();

  const data = client.hGetAll(key);
}

module.exports = {};
