// import { User } from "@/models/User";
// import mongoose from "mongoose";
import prisma from "@/lib/prisma"


export default async function getUsers() {
    try {
        // mongoose.connect(process.env.DATABASE_URL as string);
        // const users = User.find({})
        // const jUsers = JSON.parse(JSON.stringify(users));

        const users = await prisma.user.findMany();

        return users

    } catch (error: any) {
        console.log(error)
    }
}