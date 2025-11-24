import { Application } from "express";
import * as bandscontroller from "../controllers/bandscontroller";

export default function bandsRoutes(app: Application) {
  app.get("/api/bands", bandscontroller.getAllBands);
  app.get("/api/bands/:id", bandscontroller.getBandById);
  app.post("/api/bands", bandscontroller.createBand);
  app.put("/api/bands/:id", bandscontroller.updateBand);
  app.delete("/api/bands/:id", bandscontroller.deleteBand);
}
