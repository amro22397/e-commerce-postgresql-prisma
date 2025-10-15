
import { getCurrentUser } from '@/actions/getCurrentUser';
// import { OrderObj } from '@/models/OrderObj';
// import { Product } from '@/models/Product';
// import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma"


export async function POST(request: Request) {
    // mongoose.connect(process.env.DATABASE_URL as string);

   try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) return NextResponse.error();

    const body = await request.json();

    const { userId, user, products, amount, currency, status, deliveryStatus } = body;

    // const order = await OrderObj.create({
    //     userId, user, products, amount, currency, status, deliveryStatus
    // });

    const order = await prisma.orderObj.create({
        data: {
          userId, user, products, amount, currency, status, deliveryStatus 
        }
    })

    return NextResponse.json(order);

   } catch (error) {
    console.log(error)
    return NextResponse.error();
   }
}


export async function PUT(request: Request) {

    // mongoose.connect(process.env.DATABASE_URL as string);

    try {
        
        const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (currentUser?.user?.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const body = await request.json();

    const { id, deliveryStatus } = body;

    // const order = await OrderObj.updateOne({_id: id}, { deliveryStatus } )

    const order = await prisma.orderObj.update({
        where: { id: id },
        data: { deliveryStatus }
    })

    return NextResponse.json(order);

    } catch (error) {
        console.log(error)
    return NextResponse.error();
    }

}

