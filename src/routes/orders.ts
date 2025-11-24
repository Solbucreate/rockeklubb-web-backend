import { Application } from "express";
import * as orderscontroller from "../controllers/orderscontroller";

export default function ordersRoutes(app: Application) {
  app.get("/api/orders/:id", orderscontroller.getOrderById);
  app.post("/api/orders", orderscontroller.createOrder);
}
