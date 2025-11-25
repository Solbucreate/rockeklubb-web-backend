import { Request, Response } from "express";
import Event from "../models/event";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.update(req.body);
    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
