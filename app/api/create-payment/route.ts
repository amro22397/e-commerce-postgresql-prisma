import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await axios.post(
      "https://api.tap.company/v2/charges",
      {
        amount: body.amount,
        currency: "USD", // or USD, etc.
        threeDSecure: true,
        save_card: false,
        description: "Website Payment",
        statement_descriptor: "My Website",
        customer: {
          first_name: body.name,
          email: body.email,
        },
        source: {
          id: "src_all" // show all available payment methods
        },
        redirect: {
          //////// Tap will redirect here
          url: process.env.NEXTAUTH_URL // Tap will redirect here
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return Response.json({ url: response.data.transaction.url });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return Response.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
