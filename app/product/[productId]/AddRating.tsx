'use client'

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
// import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
// import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
// import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps{
    product: any & {
        reviews: any[]
    };
    user:(any & {
        orders: any[];
    }) | null
}


const AddRating:React.FC<AddRatingProps> = ({ product, user }) => {

    console.log(user)

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true);

        if (data.rating === 0) {
            setIsLoading(false)
            toast.error('No rating selected')
        }

        const ratingData = {...data, userId: user.id, product: product, user: user}

        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating submitted');
            router.refresh();
            reset();
        }).catch((error) => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false);
        })
    }

    if (!user || !product) return (
        <div className="max-w-[250px] hidden">
            <Button
            label={"Login To Add Review"}
            outline={true}
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
        
    );

    {/* 
        const deliveredOrder = user?.orders.some((order: any) => order.products.find((item: any) => item.id === product.id) && order.deliveryStatus === 'delivered')

    const userReview = product.reviews.ofind(((review: any) => {
        return review.userId === user.id
    }))

    if (userReview || !deliveredOrder) {
        return null;
    }
        */}

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
        <p>ssss</p>
        <Heading title='Rate this product'/>
        <Rating onChange={(event, newValue) => {
            setCustomValue('rating', newValue)
        }}/>
        <Input
        id='comment'
        label="Comment"
        disabled = {isLoading}
        register={register}
        errors={errors}
        required
        />
        <Button label={isLoading ? "Loading" : 'Rate Product'} onClick={handleSubmit(onSubmit)}/>
    </div>
  )
}

export default AddRating
