// import { OrderObj } from "@/models/OrderObj"
import prisma from "@/lib/prisma"

export default async function getOrders(){
    try {

        // const orders = await OrderObj.find({
        //     user: {$exists: true}
        // }).sort({ createdAt: -1 })

        // const jOrders = JSON.parse(JSON.stringify(orders));
        
        const orders = await prisma.orderObj.findMany({
            where: {
                // NOT: {
                //     user: null
                // }
                user: {
                    not: null
                }
            }
        })

        return orders
    } catch (error: any) {
        throw new Error(error) 
    }
}