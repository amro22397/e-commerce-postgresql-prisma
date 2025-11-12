import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency } = await req.json();

    // HyperPay credentials
    const entityId = process.env.HYPERPAY_ENTITY_ID;
    const accessToken = process.env.HYPERPAY_ACCESS_TOKEN; // Use sandbox or live token

    // Payment data
    const data = new URLSearchParams();
    data.append("entityId", entityId);
    data.append("amount", amount);
    data.append("currency", currency || "USD");
    data.append("paymentType", "DB"); // DB = Debit/Credit immediate payment

    // HyperPay API endpoint (sandbox/live)
    const url = `https://test.oppwa.com/v1/checkouts`;

    const response = await axios.post(url, data, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error : any) {
    console.error(error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Payment session creation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
