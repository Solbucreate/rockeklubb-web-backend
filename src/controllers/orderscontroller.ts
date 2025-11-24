import { Request, Response } from "express";
import Order from "../models/order";
import Event from "../models/event";
import Ticket from "../models/ticket";

// Hent ordre etter ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Opprett ny ordre
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { eventId, quantity } = req.body;

    // Valider input
    if (!eventId || !quantity) {
      return res.status(400).json({ error: "Missing eventId or quantity" });
    }

    // Hent eventet
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Hvor mange billetter er allerede solgt?
    const soldTickets = await Ticket.count({ where: { eventId } });

    // Sjekk maks 5 per ordre
    if (quantity > 5) {
      return res.status(400).json({ error: "Max 5 tickets per person" });
    }

    // Sjekk kapasitet
    if (soldTickets + quantity > event.capacity) {
      return res.status(400).json({ error: "Not enough tickets remaining" });
    }

    // Opprett ordre
    const order = await Order.create(req.body);

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};
