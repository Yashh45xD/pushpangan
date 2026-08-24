import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // DNS fallback
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log(`✓ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    if (mongoUri.includes("127.0.0.1") || mongoUri.includes("localhost")) {
      console.log("⚠️ Local MongoDB not running. Starting InMemory MongoDB server...");
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create({
          instance: {
            port: 27017,
            dbName: "pushpangan_db",
          },
        });
        const uri = mongod.getUri();
        console.log(`✓ InMemory MongoDB started successfully! 🔗 URI: ${uri}`);

        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 15000,
          connectTimeoutMS: 15000,
        });
        console.log(`✓ MongoDB Connected Successfully: ${conn.connection.host}`);

        process.on("SIGINT", async () => {
          await mongod.stop();
          process.exit(0);
        });
      } catch (err) {
        console.error(`❌ Failed to start InMemory MongoDB: ${err.message}`);
        process.exit(1);
      }
    } else {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      process.exit(1);
    }
  }
};
