"use client";

import { useState } from "react";
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

interface RegisterFormProps {
  currentUser: any | null;
}

const RegisterForm:React.FC<RegisterFormProps> = ({ currentUser }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);



  const handleValidation = (value: string) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");

    if (
      lower.test(value) &&
      upper.test(value) &&
      number.test(value) &&
      special.test(value)
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();


  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true); 
    console.log(data)

    if (data.name.length < 3) {
      // toast({
      //   variant: "destructive",
      //   title: "User name cannot be less than 3 characters",
      // });
      toast.error("User name cannot be less than 3 characters");
      setIsLoading(false)
      return;
    } else if (data.name.length > 25) {
      // toast({
      //   variant: "destructive",
      //   title: "User name cannot be more than 25 characters",
      // });
      toast.error("User name cannot be more than 25 characters");
      setIsLoading(false)
      return;
    }

    if (data.password.length < 6) {
      // toast({
      //   variant: "destructive",
      //   title: "Password cannot be less than 6 characters",
      // });
      toast.error("Password cannot be less than 6 characters");
      setIsLoading(false);
      return;
    } else if (data.password.length > 20) {
      // toast({
      //   variant: "destructive",
      //   title: "Password cannot be more than 20 characters",
      // });
      toast.error("Password cannot be more than 20 characters");
      setIsLoading(false);
      return;
    }


    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");

    if (!lower.test(data.password)) {
      // toast({
      //   variant: "destructive",
      //   title: "Password must contain at least one lowercase letter (asdfghjkl)",
      //   description: "",
      //   });
      toast.error(
        "Password must contain at least one lowercase letter (asdfghjkl)"
      );
      setIsLoading(false);
      return;
    }

    if (!upper.test(data.password)) {
      // toast({
      //   variant: "destructive",
      //   title: "Password must contain at least one highercase letter (ASDFGHJKL)",
      //   description: "",
      //   });
      toast.error(
        "Password must contain at least one highercase letter (ASDFGHJKL)"
      );
      setIsLoading(false);
      return;
    }

    if (!number.test(data.password)) {
      // toast({
      //   variant: "destructive",
      //   title: "Password must contain at least one number (1234567890)",
      //   description: "",
      //   });
      toast.error("Password must contain at least one number (1234567890)");
      setIsLoading(false);
      return;
    }

    if (!special.test(data.password)) {
      // toast({
      //   variant: "destructive",
      //   title: "Password must contain at least one special letter (!@#$%^&*)",
      //   description: "",
      //   });
      toast.error(
        "Password must contain at least one special letter (!@#$%^&*)"
      );
      setIsLoading(false);
      return;
    }

    
    try {
      
      const res = await axios.post('/api/register', data)
    
    if (!res.data.success) {
        toast.error(res.data.message)
        setIsLoading(false)
        return
      }

      toast.success("Account created");

      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push('/cart');
          router.refresh();
          toast.success('Logged In');
        }
      })

      setIsLoading(false)

    } catch (error) {
      
      toast.error(`Something went wrong: ${error}`);
      setIsLoading(false)

    }
    







    // axios.post('/api/register', data).then((res) => {
    //   console.log(res)
      
    // }).then(() => {
      
    //  toast.success("Account created");

    //   signIn('credentials', {
    //     email: data.email,
    //     password: data.password,
    //     redirect: false,
    //   }).then((callback) => {
    //     if (callback?.ok) {
    //       router.push('/cart');
    //       router.refresh();
    //       toast.success('Logged In');
    //     }

    //     // if (callback?.error) {
    //     //   toast.error(callback.error);
    //     // }
    //   })
    // })
    // .catch(() => toast.error("Something went wrong"))
    // .finally(() => {
    //   setIsLoading(false);
    // })


    // last line in onSubmit
  }

  if (currentUser) {
    return (
      <p className="text-center font-semibold text-lg">You are already logged in, Redirecting...</p>
    )

  }
  
  return (
    <>
    <Heading title="Sign up for E-commerce" />

    <Button
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
        }}
      />

    <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      
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
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
