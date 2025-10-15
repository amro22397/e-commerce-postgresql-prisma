import { getCurrentUser } from "@/actions/getCurrentUser";
// import { Product } from "@/models/Product";
// import { Review } from "@/models/Review";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    console.log(currentUser)

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {comment, rating, product, userId, user} = body;

    // const deliveredOrder = currentUser?.orders.some((order: any) => order.products.find((item: any) => item.id === product.id) && order.deliveryStatus === 'delivered')

   /*
    const userReview = product?.reviews.find(((review: any) => {
        return review.userId === currentUser._doc._id
    }))

    if (userReview) {
        return NextResponse.error();
    }
   */

    // const review = await Review.create({
    //     comment,
    //         rating,
    //         productId: product._id,
    //         userId,
    //         user
    // })

    // const productReview = await Product.updateOne({_id: product._id}, {
    //     $push: { reviews: review }
    // })

    const review = await prisma.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId,
            user
        }
    })

    const productArray = await prisma.product.findUnique({
        where: { id: product.id },
    })


    const productReview = await prisma.product.update({
        where: { id: product.id },
        data: {
            reviews: [...(productArray?.reviews || []), review]
        }
    })

    return NextResponse.json(review, productReview)
}

