import { getCurrentUser } from "@/actions/getCurrentUser";
// import { Product } from "@/models/Product";
// import { Review } from "@/models/Review";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: { id: string }}) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    // const review = await Review.findById({ _id: params.id });

    const review = await prisma.review.findUnique({
        where: { id: params.id }
    })

    console.log(review)

    const { productId, ...data } = review;

    // const productReview = await Product.updateOne({ _id: productId }, {
    //     $pull: {reviews: review}
    // })

    const productArray = await prisma.product.findUnique({
        where: { id: productId },
    })

    const updatedReviews = (productArray.reviews || []).filter((item: any) => item.id !== review?.id)

    const productReview = await prisma.product.update({
        where: { id: productId },
        data: {
            reviews: updatedReviews
        }
    })

    return NextResponse.json(productReview);
}