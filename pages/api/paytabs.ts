// pages/api/paytabs.js
import axios from "axios";
// import { NextResponse } from "next/server";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { amount, customer_email, customer_name } = req.body;

    const payload = {
      profile_id: process.env.PAYTABS_PROFILE_ID, // from your PayTabs dashboard
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: `cart-${Date.now()}`,
      cart_currency: "USD",
      cart_amount: amount,
      cart_description: "Test Payment",
      customer_details: {
        name: customer_name,
        email: customer_email,
      },
      return: `${process.env.NEXTAUTH_URL}/payment-success`,
      callback: `${process.env.NEXTAUTH_URL}/api/paytabs-callback`,
    };

    try {
      const response = await axios.post(
        "https://www.paytabs.com/apiv2/create_pay_page",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYTABS_SERVER_KEY}`,
          },
        }
      );

      // response.data contains the payment URL
      res.status(200).json({ payment_url: response.data.payment_url });
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
