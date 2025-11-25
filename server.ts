import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./src/config/db";

import authRoutes from "./src/routes/auth";
import bandRoutes from "./src/routes/band";
import eventRoutes from "./src/routes/event";
import ticketsRoutes from "./src/routes/tickets";
import stripeRoutes from "./src/routes/paymentStripe";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test DB-connection
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bands", bandRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/payment", stripeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
