// import { connectToDatabase } from "@/utils/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"
// import { User } from "@/models/User";
// model import 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {


        // await connectToDatabase();
        const session = await getServerSession(req, res, authOptions);
        console.log(session?.user?.email);


        if (!session) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            })
        }


        if (req.method === "GET") {
            // const users = User.find({})
            // const jUsers = JSON.parse(JSON.stringify(users));

            const users = await prisma.user.findMany();

            return res.status(200).json({
                success: true,
                data: users,
            })
        }

        res.setHeader("Allow", ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error: any) {
        console.error('Error in handler', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
