
import { getCurrentUser } from '@/actions/getCurrentUser';
// import { Product } from '@/models/Product';
// import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    // mongoose.connect(process.env.DATABASE_URL as string);


    try {


        const currentUser = await getCurrentUser();

        console.log(`Current User email: ${currentUser.user.email}`)

        if (!currentUser || currentUser?.user?.role !== 'ADMIN') {
            return NextResponse.error();
        }

        const body = await request.json();
        const { name, description, price, brand, category, inStock, images } = body;

        console.log(`the product: ${body}`)

        // const product = await Product.create({ name,
        //     description,
        //     brand,
        //     category,
        //     inStock,
        //     images,
        //     price: parseFloat(price), });

        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                category,
                inStock,
                images,
                price: parseFloat(price),
            },
        })

        return NextResponse.json(product);


    } catch (error) {

        console.log(`Server Error while adding product: ${error}`)

        return NextResponse.json({
            success: false,
            message: `Server Error while adding product: ${error}`
        })
    }
}

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (currentUser?.user?.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, inStock } = body;

    // const product = await Product.findByIdAndUpdate({ _id: id }, { inStock })

    const product = await prisma.product.update({
        where: { id: id },
        data: { inStock } 
    })

    return NextResponse.json(product);

}