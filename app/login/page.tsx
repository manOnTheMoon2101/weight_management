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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Hero from "@/app/components/Hero/hero";
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
      <div className="min-h-screen flex flex-col md:flex-row items-center">
        <Hero />
        <div className="p-8 w-full md:w-1/2 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold my-8">Login</h2>
            <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 font-bold h-8">
              <Link href="/demo">See How John's Progressing...</Link>
            </Badge>
          </div>
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
          <div className="flex flex-row">
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
              <Tooltip delayDuration={100}>
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
                <TooltipContent className="text-left">
                  {!email && "Email Required"}
                  <br />
                  {!password && "Password Required"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="mt-10">
              Don't have an account?{" "}
              <Link href="/register" className="text-accent">
                Register...
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
