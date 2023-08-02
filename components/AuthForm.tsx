"use client";

/* imports */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/* components */
import Input from "@/components/Inputs/Input";
import Button from "@/components/Button";

export default function AuthForm() {
  /* form variant type  */
  type Variant = "LOGIN" | "REGISTER";

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  /* useCallBack to toggle the variant */
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callBack) => {
          if (callBack?.error) {
            toast.error("Invalid credentials. Try again!");
          }
          if (callBack?.ok && !callBack?.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Your Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {isLoading ? (
                <span>
                  {variant === "LOGIN" ? "Signing In..." : "Registering..."}
                </span>
              ) : (
                <span>{variant === "LOGIN" ? "Sign In" : "Register"}</span>
              )}
            </Button>
          </div>
        </form>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <span>
            {variant === "LOGIN"
              ? "New to NexTalk ?"
              : "Already have an account ?"}
          </span>
          <span className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
}
