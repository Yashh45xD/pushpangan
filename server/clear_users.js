import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // DNS fallback
}

const MONGODB_URI = "mongodb+srv://yashvarpe169_db_user:SpowHiY6dSBomXNo@cluster0.no1atbc.mongodb.net/pushpangan_db?retryWrites=true&w=majority&appName=Cluster0";

async function clearUsers() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    console.log("Connected to MongoDB Atlas!");

    const db = mongoose.connection.db;

    const resUsers = await db.collection("users").deleteMany({});
    console.log(`✓ Deleted ${resUsers.deletedCount} user records from 'users' collection.`);

    const resActivity = await db.collection("activitylogs").deleteMany({});
    console.log(`✓ Deleted ${resActivity.deletedCount} records from 'activitylogs' collection.`);

    console.log("\n============================================");
    console.log("ALL USER DATA CLEARED FROM DATABASE SUCCESSFULLY!");
    console.log("============================================\n");
  } catch (err) {
    console.error("Error clearing users data:", err);
  } finally {
    await mongoose.connection.close();
  }
}

clearUsers();
