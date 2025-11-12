import { NextRequest, NextResponse } from 'next/server';
import Checkout from 'checkout-sdk-node';

const cko = new Checkout(process.env.CHECKOUT_SECRET_KEY); // Replace with your secret key



export async function POST(req: NextRequest) {

//     const ping = await cko.payments.get('pay_invalid_id');
// console.log(`Ping: ${ping}`);

  try {
    const { amount, currency } = await req.json();

    console.log(amount, currency)

    // Create a payment session
    const session = await cko.sessions.request({
      amount: amount, // amount in minor units, e.g., 1000 = $10.00
      currency: currency || 'USD',
      payment_type: 'Card',
      reference: 'order-12345',
      // optional: return URL after payment
    //   return_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
      success_url: 'http://localhost:3000/checkout/success',
      failure_url: 'http://localhost:3000/checkout/failed',
    });

    return NextResponse.json({ session });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
