import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import extraRoutes from "./routes/extraRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userAccountRoutes from "./routes/userAccountRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

const app = express();

// ─── Security Middlewares ─────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Request Parsing & Logging ────────────────────────────────────────────────
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", extraRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/account", userAccountRoutes);
app.use("/api/reminders", reminderRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "Pushpangan Backend API",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
