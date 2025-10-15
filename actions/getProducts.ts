// import { Product } from "@/models/Product";
// import mongoose from "mongoose";

import prisma from "@/lib/prisma"

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}

  export default async function getProducts(params: IProductParams) {
    
    try {

        // mongoose.connect(process.env.DATABASE_URL as string);

        const { category, searchTerm } = params;
    // let searchString = searchTerm;

    console.log(`category is : ${category}`)

    // if (!searchTerm) {
    //   searchString = "";
    // }

    let query: any = {};

    if (category) {
      query.category = category;
    }
        // const products = await Product.find({
        //     ...query,
        //     $or: [
        //         {name: {$regex: searchString, $options: "i"}},
        //         {description: {$regex: searchString, $options: "i"}}
        //     ]
        // }).sort({createdAt: -1})

        // const jProducts = JSON.parse(JSON.stringify(products));

        const products = await prisma.product.findMany({
          where: {
            AND: [
              { ...query },

              searchTerm ? {
                OR: [
                  { name: { contains: searchTerm, mode: "insensitive" } },
                  { description: { contains: searchTerm, mode: "insensitive" } },
                ]
              }
              : {}
            ]
          }
    }
          )

        console.log(products)

        return products;
    } catch (error) {
        console.log(`Server error fetching products: ${error}`);
    }
  }