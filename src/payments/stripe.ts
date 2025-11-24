import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createStripeCheckout = async (orderId: string, amount: number) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: `Billett #${orderId}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment-success?order=${orderId}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
  });

  return session;
};
