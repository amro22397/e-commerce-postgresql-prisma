// import { Product } from "@/models/Product";
// import mongoose from "mongoose";
import prisma from "@/lib/prisma"


interface IParams{
    productId?: string
}

  export default async function getProductById(params: IParams) {
    try {

        // mongoose.connect(process.env.DATABASE_URL as string);

        const {productId} = params;
        console.log(productId)

        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        // const product = await Product.findOne({_id: productId})

        console.log(product)

        // const jProduct = JSON.parse(JSON.stringify(product));

        

        if (!product) {
            // return null;
        }

        return product;

    } catch (error: any) {
        throw new Error(error)
    }
  }