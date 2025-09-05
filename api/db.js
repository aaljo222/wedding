const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "wedding";

let cached = global._mongo;
if (!cached) cached = global._mongo = { client: null, db: null };

async function getDb() {
  if (cached.db) return cached.db;
  if (!uri) throw new Error("MONGODB_URI is not set");
  const client = await MongoClient.connect(uri, {});
  cached.client = client;
  cached.db = client.db(dbName);
  return cached.db;
}
module.exports = { getDb };
