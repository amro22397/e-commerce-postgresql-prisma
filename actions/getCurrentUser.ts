// import { User } from "@/models/User";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { SafeUser } from "@/types";
// import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma"


export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<any> {
    try {
        const session = await getSession();

        console.log(`The session email is : ${session?.user?.email}`)

        let mySession;

        if (!session?.user?.email) {
            return null;
        }

        // mongoose.connect(process.env.DATABASE_URL as string);
        // const currentUser = await User.findOne({
        //     email: session?.user?.email,
        //     orders: { $exists: true }
        // })

        const currentUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
            // NOT: { orders: null }
        })

        console.log(`the current user: ${currentUser}`)

        if (!currentUser) {
            // const user = await User.create({
            //     name: session?.user.name,
            //     email: session?.user?.email,
            //     image: session?.user?.image,
            //   })

            const user = await prisma.user.create({
                data: {
                    name: session?.user.name,
                    email: session?.user?.email,
                    image: session?.user?.image,
                }
            })

            mySession = session;
            mySession.user = user;

            const jSession = JSON.parse(JSON.stringify(mySession));

            return jSession;
        } else {
            mySession = session;
            mySession.user = currentUser;

            const jSession = JSON.parse(JSON.stringify(mySession));

            return jSession;
        }


    } catch (error: any) {
        console.log(`Server Error getting the user: ${error}`)
    }
}