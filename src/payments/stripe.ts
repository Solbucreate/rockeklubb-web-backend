import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2024-06-20",
});

/**
 * Oppretter en Stripe Checkout Session for en billettbestilling.
 *
 * @param orderId   Ordre-ID i databasen
 * @param amount    Totalpris for ordren (i kroner)
 * @param email     Kundens e-postadresse
 * @param eventName Navnet på arrangementet
 */
export async function createStripeCheckout(
  orderId: number,
  amount: number,
  email: string,
  eventName: string
) {
  if (!process.env.STRIPE_SECRET) {
    throw new Error("STRIPE_SECRET is missing in environment variables");
  }

  // Stripe forventer beløp i øre (NOK → øre)
  const amountInOre = amount * 100;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: eventName,
          },
          unit_amount: amountInOre,
        },
        quantity: 1,
      },
    ],

    customer_email: email,

    metadata: {
      orderId: orderId.toString(),
    },

    success_url: `${process.env.BASE_URL}/payment/success?orderId=${orderId}`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel?orderId=${orderId}`,
  });

  return session;
}
