import { Request, Response } from "express";
import Ticket from "../models/ticket";
import Order from "../models/order";
import Event from "../models/event";
import { generateQR } from "../utils/qrGenerator";
import { generatePDF } from "../utils/pdfGenerator";
import { sendEmail } from "../utils/emailer";

export const generateTickets = async (req: Request, res: Response) => {
  try {
    const { orderId, eventId, quantity } = req.body;

    // 1. Hent ordre
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // 2. Hent event
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const tickets = [];

    // 3. Lag billetter
    for (let i = 0; i < quantity; i++) {
      const code = `${orderId}-${i + 1}-${Date.now()}`;
      const qr = await generateQR(code);

      const ticket = await Ticket.create({
        orderId,
        eventId,
        qrCode: code,
      });

      const pdf = await generatePDF({
        event,
        order,
        qrCode: code,
      });

      tickets.push({ ticket, pdf });
    }

    // 4. Send e-post
    await sendEmail({
      to: order.email,
      subject: "Dine billetter",
      text: "Her er dine billetter!",
      attachments: tickets.map(t => ({
        filename: `billett-${t.ticket.id}.pdf`,
        content: t.pdf,
      })),
    });

    return res.json({ message: "Tickets generated and sent", count: quantity });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate tickets" });
  }
};
