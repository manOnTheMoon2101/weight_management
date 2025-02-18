"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import isValidEmail from "@/utils/emailValidation";
import { Londrina_Shadow } from "next/font/google";
import { Info } from "./components/info/Info";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const lodrina = Londrina_Shadow({
  subsets: ["latin"],
  weight: "400",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      router.push("/?welcome=true");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBlur = () => {
    setTouched(true);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="flex flex-row justify-end">
        <Info />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="p-8 rounded shadow-lg">
          <div className="flex justify-center">
            <h2 className={`${lodrina.className} text-4xl my-4`} >Belly Buster!!!</h2>
          </div>
          {/* <Label className="text-4xl">Email</Label> */}
          {/* <Input
          placeholder="email@example.com"
          type="email"
          className="border-accent"
          value={email}
          onBlur={handleBlur}
          onChange={(e) => setEmail(e.target.value)}
        /> */}

          <div className="group relative z-0 mb-6 w-full">
            <input
              type="email"
              name="totalCalories"
              id="floating-input"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder=""
            />
            <Label
              htmlFor="floating-input"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
            >
              Email
            </Label>
          </div>
          {touched && !isValidEmail(email) && email !== "" && (
            <p className="text-red-600">Not Valid Email!</p>
          )}
          {/* <Label className="text-4xl">Password</Label> */}
          <div className="flex flex-row">
            {/* <Input
            placeholder="*****"
            type={showPassword ? "text" : "password"}
            className="border-accent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}

            <div className="group relative z-0 mb-6 w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="totalCalories"
                id="floating-input"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
                placeholder=""
              />
              <Label
                htmlFor="floating-input"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
              >
                Password
              </Label>
            </div>
            <Button type="button" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <div className="flex flex-col mt-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    {loading ? (
                      <AiOutlineLoading className="animate-spin text-accent text-lg w-full" />
                    ) : (
                      <Button
                        className={`bg-accent text-slate-50 w-full`}
                        onClick={onSubmit}
                        disabled={!isValidEmail(email) || !password}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-red-600 text-left">
                  {!email && "Email Required"}
                  <br />
                  {!password && "Password Required"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="mt-10">
              Don't have an account?{" "}
              <Link href="/pages/register" className="text-accent">
                Register?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
