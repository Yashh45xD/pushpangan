import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB Atlas and start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🌸 Pushpangan Backend API — STARTED`);
    console.log(`🚀 Server running on    : http://localhost:${PORT}`);
    console.log(`📡 API Base URL         : http://localhost:${PORT}/api`);
    console.log(`❤️  Health Check         : http://localhost:${PORT}/health`);
    console.log(`🌍 Environment          : ${process.env.NODE_ENV || "development"}`);
    console.log(`==================================================`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! Shutting down...");
    console.error(err.name, err.message);
    server.close(() => process.exit(1));
  });
});
