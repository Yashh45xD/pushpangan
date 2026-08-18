import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // DNS fallback
}

export const MONGODB_URI =
  import.meta.env.VITE_MONGODB_URI ||
  "mongodb+srv://yashvarpe169_db_user:SpowHiY6dSBomXNo@cluster0.no1atbc.mongodb.net/pushpangan_db?retryWrites=true&w=majority&appName=Cluster0";

let cachedClient: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export async function getMongoDb(dbName = "pushpangan_db") {
  const client = await getMongoClient();
  return client.db(dbName);
}

export { ObjectId };
