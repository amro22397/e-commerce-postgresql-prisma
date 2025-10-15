"use client";

import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import Input from "../../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null | undefined;
}
const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        router.push('/')
      router.refresh()
      }, 3000);
    }
  }, []);

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {

    setIsLoading(true); 

    const res = await axios.post("/api/login", { ...data });

    console.log(res)

    if (!res.data.success) {
      toast.error(`${res.data.message}`);
      setIsLoading(false);
      return
    }

    if (res.data.success) {
      signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push('/');
        router.refresh();
        toast.success('Logged In');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }

      setIsLoading(false)
    })


      setIsLoading(false);
    }

    
    
  }

  if (currentUser) {
    return (
      <p className="text-center font-semibold text-lg">You are already loggen in, Redirecting...</p>
    )

  }


  return (
    <>
    <Heading title="Login into E-commerce" />

    <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={async () => {
          await signIn("google", { callbackUrl: `/` });
        }}
      />

    <hr className="bg-slate-300 w-full h-px" />
      
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      
      <Button
        label={isLoading ? "Loading" : "Log In"}
        onClick={handleSubmit(onSubmit)}
      />
      
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Sign Up
        </Link>
      </p>
    </>
  )
}

export default LoginForm
