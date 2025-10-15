"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteMessage from "@/components/DeleteMessage";
import axios from "axios";
import { products } from "@/utils/products";
import toast from "react-hot-toast";
import { error } from "console";

interface CartClientProps {
  currentUser: any | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

    const [deleteMessage, setDeleteMessage] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">

        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="
          text-slate-500 flex items-center gap-1
          mt-2
          "
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  console.log(cartProducts, cartTotalAmount)


  const handleOrder = async () => {

    setIsLoading(true);

    const order = {
      userId: currentUser?.id, user: currentUser, products: cartProducts, amount: cartTotalAmount, currency: "usd", 
      status: "pending", deliveryStatus: "pending"
    }

    axios
    .post('/api/order', order)
    .then(() => {
      toast.success("Order placed successfully")
      router.refresh();
    })
    .catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
      router.push('/checkout')
      handleClearCart();
    })

    
  }

  return (
    <div className="">
        {deleteMessage && (
				<DeleteMessage text={"Are you sure you want to clear all items?"}
				setDeleteMessage={setDeleteMessage} handleDeletePost={() => handleClearCart()} />
			)}

        <Heading title="Shopping Cart" center /> 
      <div className="grid
      grid-cols-5
      text-xs
      gap-4
      pb-2
      items-center
      mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>

      <div className="">
        {cartProducts && cartProducts.map(item => {
            return <ItemContent key={item.id} item={item} />
        })}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
      <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
                setDeleteMessage(true)
            }}
            small
            outline
          />
        </div>

        <div className="text-sm flex flex-col gap-2 items-start my-5">
            <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
            </div>

            <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>

          <Button
            label={currentUser ? "Checkout" : "Login To Checkout"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? handleOrder() : router.push("/login");
            }}
          />
          <Link
            href={"/"}
            className="
          text-slate-500 flex items-center gap-1
          mt-2
          "
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartClient
