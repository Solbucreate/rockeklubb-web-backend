import { Application, Request, Response } from "express";
import stripeHandler from "../payments/stripe";

export default function stripeRoutes(app: Application) {
  app.post("/api/pay/stripe", async (req: Request, res: Response) => {
    try {
      const { orderId, amount } = req.body;

      const session = await createStripeCheckout(orderId, amount);

      res.json({ id: session.id, url: session.url });
    } catch (error) {
      res.status(500).json({ error: "Stripe payment failed" });
    }
  });
}
