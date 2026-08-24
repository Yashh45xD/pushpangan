import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // DNS fallback
}

let isConnected = false;

export const connectDB = async () => {
  // Reuse existing connection (important for serverless warm starts)
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✓ MongoDB: reusing existing connection");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    isConnected = true;
    console.log(`✓ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    isConnected = false;
    // Local fallback: try InMemory MongoDB
    if (mongoUri.includes("127.0.0.1") || mongoUri.includes("localhost")) {
      console.log("⚠️ Local MongoDB not running. Starting InMemory MongoDB...");
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create({
          instance: { port: 27017, dbName: "pushpangan_db" },
        });
        const inMemoryUri = mongod.getUri();
        await mongoose.connect(inMemoryUri, {
          serverSelectionTimeoutMS: 15000,
          connectTimeoutMS: 15000,
        });
        isConnected = true;
        console.log(`✓ InMemory MongoDB started: ${inMemoryUri}`);
      } catch (err) {
        throw new Error(`Failed to start InMemory MongoDB: ${err.message}`);
      }
    } else {
      // On production/serverless: throw so the caller sees the error
      throw new Error(`MongoDB Connection Error: ${error.message}`);
    }
  }
};
