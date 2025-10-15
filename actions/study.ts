import prisma from "@/lib/prisma"

type Params = {
    id: string
}

export default async function study(params : Params) {

    console.log(params)

    const { category, searchTerm } = params;

    let searchString = searchTerm;

    if (!searchTerm) {
        searchString = "";
    }

    let query = {}

    if (category) {
        query.category = category;
    }


    const products = await prisma.product.findMany({
        where: {
            AND: [
                { ...query },

                searchTerm ? {
                    OR: [
                        { name: { contains: searchString, mode: "insensitive" }},
                        { description: { contains: searchString, mode: "insensitive" }},
                    ]
                }
                : {} 
            ]
        },
        orderBy: { createdAt: "desc" },
    })
}