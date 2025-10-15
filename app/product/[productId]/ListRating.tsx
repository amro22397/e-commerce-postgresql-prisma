'use client'

import Heading from "@/components/Heading";
import { Rating } from "@mui/material";
import Avatar from "@/components/Avatar";
import moment from "moment";
import { Router, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeleteMessage from "@/components/DeleteMessage";
import { useState } from "react";
import TrashComponent from "@/components/TrashComponent";

interface ListRatingProps {
  product: any;
  user: any;
}



const ListRating: React.FC<ListRatingProps> = ({ product, user }) => {
  const router = useRouter();

  const [deleteMessage, setDeleteMessage] = useState(false);

  const handleDeleteReview = (id: string) => {
    axios.delete(`/api/rating/${id}`)
    .then((res) => {
      toast.success("Review deleted successfully")
      router.refresh()
    })
    .catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    })
  }

  return (
    <div>

      <Heading title="Product Review" />

      <div className="text-sm mt-2">
        {product.reviews && product.reviews.map((review: any) => {
            return (
                <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center flex-row justify-between">
                {/* <Avatar src={review?.user.image} />  */}
                  <div className="">
                  <div className="font-semibold">{review?.user?.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                  </div>
                  
                  {user?.role === "ADMIN" || user?.id === review?.userId ? (
                    <div className="">
                    <TrashComponent review={review} handleDeleteReview={() => handleDeleteReview(review.id)} />
                  </div>
                  ) : (
                    <></>
                  )}

                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default ListRating
