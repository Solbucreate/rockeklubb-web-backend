import { Application } from "express";
import * as authcontroller from "../controllers/authcontroller";
import { authMiddleware } from "../middleware/authMiddleware";

export default function authRoutes(app: Application) {
  app.post("/api/auth/login", authcontroller.login);
  app.get("/api/auth/profile", authMiddleware, authcontroller.getProfile);
}
