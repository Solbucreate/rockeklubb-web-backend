import { Application } from "express";
import * as eventscontroller from "../controllers/eventscontroller";

export default function eventsRoutes(app: Application) {
  app.get("/api/events", eventscontroller.getAllEvents);
  app.get("/api/events/:id", eventscontroller.getEventById);
  app.post("/api/events", eventscontroller.createEvent);
  app.put("/api/events/:id", eventscontroller.updateEvent);
  app.delete("/api/events/:id", eventscontroller.deleteEvent);
}

