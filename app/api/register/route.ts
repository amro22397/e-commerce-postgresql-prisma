import bcrypt from 'bcrypt'
// import mongoose from 'mongoose';
// import { User } from '../../../models/User'
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    // mongoose.connect(process.env.DATABASE_URL as string);

    const body = await request.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const isUserExist = await prisma.user.findFirst({
        where: { name: name },
    })

    if (isUserExist) {

        return Response.json({
            success: false,
            message: "User name already exists",
        })

        // if (isUserExist.hashedPassword) {

        // } else {
        // const updateUser = await User.updateOne({ name: name }, {
        //     $set: {
        //         name: name,
        //         hashedPassword: hashedPassword,
        //     }
        // })

        // return Response.json({
        //     success: true,
        //     message: "User created successfully",
        //     user: updateUser,
        // })
    }



    // const isEmailExist = await User.findOne({ email: email });

    const isEmailExist = await prisma.user.findUnique({
        where: { email: email },
    })

    if (isEmailExist) {
        if (isEmailExist.hashedPassword) {
            return Response.json({
                success: false,
                message: "Email already exists",
            })
        } else {
            // const updateUser = await User.updateOne({ email: email }, {
            //     $set: {
            //         name: name,
            //         hashedPassword: hashedPassword,
            //     }
            // })

            const updateUser = await prisma.user.update({
                where: { email: email },

                data: {
                    name: name,
                    hashedPassword: hashedPassword,
                }
            })

            return Response.json({
                success: true,
                message: "User password updated successfully",
                status: 150,
                user: updateUser,
            })
        }
    }

    // const user = await User.create({ name, email, hashedPassword });

    const user = await prisma.user.create({
        data: {
          name, email, hashedPassword  
        }
    })

    return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: user,
    })
}