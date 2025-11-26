import { Application } from "express";
import { menucontroller } from "../controllers/menucontroller";

export default function menuRoutes(app: Application) {
  app.get("/api/menu", menucontroller.getAll);
  app.get("/api/menu/:id", menucontroller.getById);
  app.post("/api/menu", menucontroller.create);
  app.put("/api/menu/:id", menucontroller.update);
  app.delete("/api/menu/:id", menucontroller.delete);
}
