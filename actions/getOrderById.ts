// import { Order } from "@/models/Order";
// import { OrderObj } from "@/models/OrderObj";
import { getCurrentUser } from "./getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

interface IParams {
    orderId?: string;
  }

  
  export default async function getOrderById(params: IParams) {
    try {

        const currentUser = await getCurrentUser();
    
        if (!currentUser) return NextResponse.error();

        const { orderId } = params;

        // const order = await OrderObj.findOne({ _id: orderId });
        // const jOrder = JSON.parse(JSON.stringify(order));

        const order = await prisma.orderObj.findUnique({
          where: { id: orderId },
        })

        if (!order) return null;

        return order
    } catch (error: any) {
        throw new Error(error)
    }
  }