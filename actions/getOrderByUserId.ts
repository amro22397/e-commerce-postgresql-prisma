// import { OrderObj } from "@/models/OrderObj"
import prisma from "@/lib/prisma"

export default async function getOrdersByUserId(id: string){
    try {
        // const orders = await OrderObj.find(
        //     { userId: { $in: [id] } },
        // ).sort({ createdAt: -1 })

        // const jOrders = JSON.parse(JSON.stringify(orders));

        const orders = await prisma.orderObj.findMany({
            where: { userId: id },
            orderBy: { createdAt: "desc"}
        })

        return orders
    } catch (error: any) {
        throw new Error(error)
    }
}