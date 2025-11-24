import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./src/config/db";

// Routes
import authRoutes from "./src/routes/auth";
import bandRoutes from "./src/routes/band";
import eventRoutes from "./src/routes/event";
import ticketRoutes from "./src/routes/tickets";
import orderRoutes from "./src/routes/orders";
import stripeRoutes from "./src/routes/paymentStripe";
import vippsRoutes from "./src/routes/paymentVipps";

dotenv.config();

const app = express();

// Render gives port automatically
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Connect DB (Render + local)
connectDB();

// Static admin panel (Render runs compiled JS in dist)
const adminPath = path.join(__dirname, "admin");
console.log("Serving admin from:", adminPath);

app.use("/admin", express.static(adminPath));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bands", bandRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments/stripe", stripeRoutes);
app.use("/api/payments/vipps", vippsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Larvik Rockeklubb Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
