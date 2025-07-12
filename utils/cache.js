const { createClient } = require("redis");

const redisHostname = process.env.REDIS_HOSTNAME;
const redisPort = process.env.REDIS_PORT;

async function getCache(key) {
  const client = createClient({
    socket: {
      host: redisHostname,
      port: redisPort,
    },
  });
  client.on("error", (error) => console.log("Redis Error", error));
  client.connect();

  console.log(`Searching for cached value of ${key}`);
  console.log(typeof key);

  const data = await client.hGetAll(key);
  client.close();
  return data;
}

async function setCache(key, value) {
  const client = createClient({
    socket: {
      host: redisHostname,
      port: redisPort,
    },
  });
  client.on("error", (error) => console.log("Redis Error", error));
  client.connect();

  client.setEx(key, 3600, value);

  client.hSet(key, value);
  client.close();
}

module.exports = { getCache, setCache };
