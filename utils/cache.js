const { createClient } = require("redis");

const redisHostname = process.env.REDIS_HOSTNAME;
const connectionString = `redis://${redisHostname}:6379`;

async function getCache(key) {
  const client = createClient({ url: connectionString });
  client.on("error", (error) => console.log("Redis Error", error));

  client.connect();

  const data = await client.hGetAll(key);
  client.close();
  return data;
}

async function setCache(key, value) {
  const client = createClient(connectionString);
  client.on("error", (error) => console.log("Redis Error", error));
  client.connect();

  client.hSet(key, value);
  client.close();
}

module.exports = { getCache, setCache };
