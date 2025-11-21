import crypto from "crypto";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, amount } = await req.json();

    const sellerId = process.env.TWOCHECKOUT_SELLER_ID;
    const secretKey = process.env.TWOCHECKOUT_SECRET_KEY;

    const response = await fetch("https://sandbox.2checkout.com/checkout/api/payments/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Seller-Id": sellerId,
        "X-Secret-Key": secretKey
      },
      body: JSON.stringify({
        merchantOrderId: "order_" + Date.now(),
        token,
        currency: "USD",
        total: amount,
        billingAddr: {
          name: "Test User",
          addrLine1: "Street 1",
          city: "Muscat",
          country: "OM",
          email: "test@example.com"
        }
      })
    });

    const data = await response.json();

    if (data.response?.responseCode === "APPROVED") {
      return Response.json({
        success: true,
        message: "Payment Success!"
      });
    }

    return Response.json({
      success: false,
      message: "Payment failed: " + data.response?.responseMsg
    });

  } catch (err: any) {
    return Response.json({ success: false, message: err.message });
  }
}
