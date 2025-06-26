const { createClient } = require("redis");

function getCache(key) {
  const client = createClient();
  client.connect();

  const data = await client.hGetAll(key);
  return data;
}


function setCache(key, value) {
  const client = createClient();
  client.connect();

  client.hSetAll(key, value)
}


module.exports = {};
