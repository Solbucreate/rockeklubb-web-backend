import { Application, Request, Response } from "express";
import { createStripeCheckout } from "../payments/stripe";

export default function stripeRoutes(app: Application) {
  app.post("/api/pay/stripe", async (req: Request, res: Response) => {
    try {
      const { orderId, amount, email, eventName } = req.body;

      if (!orderId || !amount || !email || !eventName) {
        return res.status(400).json({ error: "Missing payment fields" });
      }

      const session = await createStripeCheckout(
        orderId,
        amount,
        email,
        eventName
      );

      return res.json({ id: session.id, url: session.url });
    } catch (error) {
      console.error("Stripe route failed:", error);
      res.status(500).json({ error: "Stripe payment failed" });
    }
  });
}
