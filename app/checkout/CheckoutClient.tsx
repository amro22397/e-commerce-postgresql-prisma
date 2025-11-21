"use client";

// import { useCart } from '@/hooks/useCart';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Script from "next/script";

// import toast from 'react-hot-toast';
// import CheckoutForm from './CheckoutForm';
// import Button from "@/components/Button";
import { User } from "@/types/user";
import { paymentTypesImages } from "@/constants/payment-types/images";
import Image from "next/image";

/* const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  ); */

const CheckoutClient = ({ user }: { user: User }) => {
  // const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [msg, setMsg] = useState("");


  // const [testData, setTestData] = useState({ amount: 1, customer_email: user?.email, customer_name: user?.name });
  // const [error, setError] = useState(false);
  // const [clientSecret, setClientSecret] = useState("");
  // const [paymentSuccess, setPaymentSuccess] = useState(false);


  const [data, setData] = useState();
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

      setData(data)

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





  // 2Checkout payment


  const pay = () => {
    setLoading(true);

    if (!window.TCO) {
      setMsg("TCO library not loaded!");
      return;
    }

    try {
      

      const args = {
      sellerId: process.env.NEXT_PUBLIC_TWOCHECKOUT_SELLER_ID,
      publishableKey: process.env.NEXT_PUBLIC_TWOCHECKOUT_PUBLIC_KEY,
      ccNo: document.getElementById("ccNo").value,
      cvv: document.getElementById("cvv").value,
      expMonth: document.getElementById("expMonth").value,
      expYear: document.getElementById("expYear").value,
    };

    window.TCO.loadPubKey("sandbox", async function () {
      window.TCO.requestToken(async function (data: any) {
        const res = await fetch("/api/2checkout/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: data.response.token.token,
            amount: 1, // it was 50
          }),
        });

        const json = await res.json();
        setMsg(json.message);
        setLoading(false);
      },
      function (error) {
        setMsg(error.errorMsg);
        setLoading(false);
      }, args);
    });

    setLoading(false);


    } catch (error) {
      
      console.log(`Client error with 2Checkout payment: ${error}`)

      setMsg(`Client error with 2Checkout payment: ${error}`)

      alert(`Client error with 2Checkout payment: ${error}`)

      setLoading(false);
    }
  };



  const isRunning = false;

  if (isRunning) {
    handleCheckout();
    handlePay()
    handlePayment();
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

        <Script src="https://secure.2checkout.com/checkout/api/2co.min.js"
        strategy="beforeInteractive"
        />

        <pre className="">{JSON.stringify(data, null, 2)}</pre>

      <h1 className="text-2xl">Checkout Page</h1>


      <h1>2Checkout Payment</h1>

      <input id="ccNo" placeholder="Card Number" /><br />
      <input id="cvv" placeholder="CVV" /><br />
      <input id="expMonth" placeholder="Exp Month" /><br />
      <input id="expYear" placeholder="Exp Year" /><br />

      <button onClick={pay} disabled={loading}>
        {loading ? "Processing..." : "Pay 1$"}
      </button>

      <p>{msg}</p>


      <span className="text-center text-rose-600">
            You may be able to pay with (Apple Pay, Google Pay), but I&apos;m working to make
            debit card payments available.
        </span>


      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <div className="flex flex-row gap-[14px] items-center justify-end mt-3">
        {paymentTypesImages.map((item, index) => (
          <Image
          key={index}
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          />
        ))}
      </div>

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
