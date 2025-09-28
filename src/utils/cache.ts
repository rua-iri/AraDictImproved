import { createClient } from "redis";

const redisHostname = process.env.REDIS_HOSTNAME;
const redisPort = process.env.REDIS_PORT;

async function getCache(key: string) {
  if (!redisHostname || !redisPort) {
    throw new Error("Empty Redis Hostname or Port");
  }

  const client = createClient({
    socket: {
      host: redisHostname,
      port: Number(redisPort),
    },
  });
  client.on("error", (error: Error) => console.log("Redis Error", error));
  client.connect();

  console.log(`Searching for cached value of ${key}`);
  console.log(typeof key);

  const data = await client.hGetAll(key);
  client.close();
  return data;
}

async function setCache(key: string, value: string) {
  if (!redisHostname || !redisPort) {
    throw new Error("Empty Redis Hostname or Port");
  }

  const client = createClient({
    socket: {
      host: redisHostname,
      port: Number(redisPort),
    },
  });
  client.on("error", (error: string) => console.log("Redis Error", error));
  client.connect();

  client.setEx(key, 3600, value);

  client.hSet(key, value);
  client.close();
}

export { getCache, setCache };
