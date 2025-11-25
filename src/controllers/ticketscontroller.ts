import { Request, Response } from "express";
import Event from "../models/event";
import Order from "../models/order";
import Ticket from "../models/ticket";

import { generateQR } from "../utils/qrGenerator";
import { generateTicketPDF } from "../utils/pdfGenerator";
import { sendEmail } from "../utils/emailer";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { eventId, email } = req.body;

    // 1. Hent event
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // 2. Opprett ordre
    const order = await Order.create({
      eventId,
      email,
      totalAmount: event.price,
    });

    // 3. Opprett billett
    const ticket = await Ticket.create({
      eventId,
      orderId: order.id,
      email,
    });

    // 4. Generer QR-kode
    const qrBuffer = await generateQR(`ticket-${ticket.id}`);

    // 5. Lag PDF (returnerer filsti)
    const pdfPath = await generateTicketPDF({
      eventTitle: event.title,
      eventDate: event.date.toString(),
      eventTime: "",
      venue: "Larvik Rockeklubb",
      qrCode: qrBuffer,
      ticketId: ticket.id,
      orderId: order.id,
      email,
    });

    // 6. Send e-post med PDF
    await sendEmail({
      to: email,
      subject: "Din billett til Larvik Rockeklubb",
      html: `<p>Takk for din bestilling! Billetten ligger vedlagt.</p>`,
      attachments: [
        {
          filename: `ticket-${order.id}-${ticket.id}.pdf`,
          path: pdfPath,
        },
      ],
    });

    res.json({
      success: true,
      message: "Ticket created and email sent",
      ticketId: ticket.id,
      orderId: order.id,
    });

  } catch (error) {
    console.error("Ticket creation error:", error);
    res.status(500).json({ error: "Ticket creation failed" });
  }
};
