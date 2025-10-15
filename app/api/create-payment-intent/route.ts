{/*
    import { getCurrentUser } from "@/actions/getCurrentUser";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { Order } from "@/models/Order";
import { error } from "console";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-09-30.acacia",
});

// api version original "2022-11-15"
const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0);

    const price: any = Math.floor(totalPrice);

    return price;
  
};

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
      }

      const body = await request.json();
  const { items, payment_intent_id } = body;

  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: {connect: {id: currentUser._doc._id}},
    amount: total,
    currency: 'usd',
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
    );

    if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
            payment_intent_id,
            {amount: total }
        );

        const [existing_order, update_order] = await Promise.all([
            Order.findOne({
                paymentIntentId: payment_intent_id
            }),
            Order.updateOne({
                paymentIntentId: payment_intent_id
            }, { amount: total, products: items })
        ]);
    
        if (!existing_order) {
            return NextResponse.error();
        }
    
        return NextResponse.json({ paymentIntent: updated_intent })

    }

  } else {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;

    await Order.create(orderData);

    return NextResponse.json({ paymentIntent })
  }


  return NextResponse.error();
}
    */}

    export async function POST(request: Request) {
        console.log('ali')

        console.log(request)
    }