"use client";

// import { useCart } from '@/hooks/useCart';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import toast from 'react-hot-toast';
// import CheckoutForm from './CheckoutForm';
// import Button from "@/components/Button";
import { User } from "@/types/user";

/* const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  ); */

const CheckoutClient = ({ user }: { user: User }) => {
  // const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  // const [error, setError] = useState(false);
  // const [clientSecret, setClientSecret] = useState("");
  // const [paymentSuccess, setPaymentSuccess] = useState(false);

  // const router = useRouter();



  const handleCheckout = async () => {
    setLoading(true);

    // 1️⃣ Call backend to create a session
    const res = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 100, currency: 'USD' }),
      // change the amount here >> 1$ = 100 centes (amount must be in cents)
    });

    const data = await res.json();

    if (data.session && data.session.id) {
      // 2️⃣ Redirect user to Checkout.com's hosted payment page
      window.location.href = data.session.redirect_url;
    } else {
      setResponse(data)
      alert('Error creating checkout session');
      console.error(`Error creating checkout session: ${data.error}`);
    }

    setLoading(false);
  };






  // paytabs payments


  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/paytabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1, customer_email: user?.email, customer_name: user?.name }),
      });
      const data = await res.json();
      if (data.payment_url) {
        window.location.href = data.payment_url; // redirect to PayTabs payment page
      } else {
        alert("Payment initiation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    } finally {
      setLoading(false);
    }
  };





  // tap payments


  const handlePay = async () => {
    setLoading(true);

    if (!user) {
      alert("Please login first")
    }


    const res = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: 1, // USD
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };




  const isRunning = false;

  if (isRunning) {
    handleCheckout();
    handlePay()
  }

  /* 
useEffect(() => {
    if (cartProducts) {
        setLoading(true);
        setError(false);

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartProducts,
                payment_intent_id: paymentIntent,
            }),
        })
        .then((res) => {
            setLoading(false);
            if (res.status === 401) {
                return router.push('/login')
            }

            return res.json();
        })
        .then((data) => {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
            setError(true);
            console.log("Error", error);
            toast.error("Something went wrong")
        })
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
        theme: "stripe",
        labels: "floating",
    }
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, [])

  */

  return (
    <div className="w-full flex flex-col gap-[14px] justify-center items-center">
      {/* <span className="text-center text-rose-600">
            Checkout Form is not available now I will make it available once
            I make Stripe Account...
        </span> */}

        {/* <pre className="">{JSON.stringify(user, null, 2)}</pre> */}

      <h1 className="text-2xl">Checkout Page</h1>

      <span className="text-center text-rose-600">
            You may be able to pay with (Apple Pay, Google Pay), but I&apos;m working to make
            debit card payments available.
        </span>


      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* <Button
        label="Your Orders"
        moreClass="bg-gray-700 text-white border-none hover:bg-gray-800
                w-[300px] mx-auto"
        onClick={() => {
          router.push("/orders");
        }}
      /> */}

      {/* clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm 
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
        </Elements>
      )

<Elements options={options} stripe={stripePromise}>
            <CheckoutForm 
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
        </Elements>


{loading && <div className="text-center">Loading Checkout...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}
*/}
      {/* {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CheckoutClient;
