"use client";

import Heading from "@/components/Heading";
import Status from "@/components/Status";
import { formatPrice } from "@/utils/formatPrice";
// import { Order, User } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface OrderDetailsProps {
  order: any;
  currentUser: any;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order, currentUser }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8 flex flex-row justify-between items-center">
        <Heading title="Order Details" />

        <div className="flex flex-col gap-2">
            {currentUser.role === "ADMIN" && (
                <Link href='/admin/manage-orders' className="text-md hover:underline flex flex-row items-center gap-1"
                 ><ArrowLeft size={22} /> Manage Orders</Link>
            )}
            
            {currentUser && (
                <Link href='/orders' className="text-md hover:underline flex flex-row items-center gap-1"
                 ><ArrowLeft size={22} /> Your Orders</Link>
            )}


        </div>
      </div>

      <div> <span className="font-semibold">User: </span>
        {order?.user.name}</div>

      <div> <span className="font-semibold">Order ID: </span>
        {order.id}</div>

      <div>
        <span className="font-semibold">Total Amount:{" "}</span>
        
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>

      <div className="flex gap-2 items-center">

      <div className="font-semibold" >Payment status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>

      </div>
      

        <div className="flex gap-2 items-center">
        <div className="font-semibold">Delivery status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
        </div>

        <div> <span className="font-semibold">Order since: </span>
             {moment(order.createDate).fromNow()}</div>


      <div className="text-xl flex flex-col gap-3 mt-8">
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-sm font-semibold gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item: any) => {
            return <><OrderItem key={item.id} item={item}></OrderItem> </>;
          })}
      </div>
    </div>
  )
}

export default OrderDetails
