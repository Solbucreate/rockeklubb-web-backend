import { Application, Request, Response } from "express";
import { createVippsPayment } from "../payments/vipps";

export default function vippsRoutes(app: Application) {
  app.post("/api/pay/vipps", async (req: Request, res: Response) => {
    try {
      const { orderId, amount } = req.body;

      const returnUrl = `${process.env.FRONTEND_URL}/payment-success?order=${orderId}`;

      const vippsSession = await createVippsPayment(orderId, amount, returnUrl);

      res.json(vippsSession);
    } catch (error) {
      res.status(500).json({ error: "Vipps payment failed" });
    }
  });
}
