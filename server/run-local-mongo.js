import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

async function startMongo() {
  console.log("Starting InMemory MongoDB on port 27017...");
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'pushpangan_db',
    }
  });

  const uri = mongod.getUri();
  console.log(`==========================================`);
  console.log(`✓ InMemory MongoDB started successfully!`);
  console.log(`🔗 URI: ${uri}`);
  console.log(`==========================================`);
  
  // Keep process alive
  process.on('SIGINT', async () => {
    await mongod.stop();
    process.exit(0);
  });
}

startMongo().catch((err) => {
  console.error("❌ Failed to start InMemory MongoDB:", err);
  process.exit(1);
});
