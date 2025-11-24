import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const vippsApiUrl = "https://api.vipps.no/checkout/v1/session";

export const createVippsPayment = async (orderId: string, amount: number, returnUrl: string) => {
  try {
    const payload = {
      amount: {
        currency: "NOK",
        value: amount * 100,
      },
      reference: orderId,
      returnUrl,
      paymentMethod: {
        type: "CARD",
      },
    };

    const response = await axios.post(vippsApiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "client_id": process.env.VIPPS_CLIENT_ID,
        "client_secret": process.env.VIPPS_CLIENT_SECRET,
        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_NUMBER
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error);
    throw new Error("Vipps payment failed");
  }
};
