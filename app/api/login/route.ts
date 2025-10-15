import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function POST(req: Request) {

    const { email, password } = await req.json();

    const isEmailExist = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!isEmailExist) {
        return NextResponse.json({
            success: false,
            message: "Email is not correct"
        })
    } else if (isEmailExist) {

        const isCorrectPassword = await bcrypt.compare(password, isEmailExist.hashedPassword);

        if (!isCorrectPassword) {
            return NextResponse.json({
                success: false,
                message: "Password is incorrect"
            })
        } else {
            return NextResponse.json({
                success: true,
                message: "User can login!"
            })
        }
    }
}