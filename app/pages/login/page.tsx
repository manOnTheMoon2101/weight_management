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
import { Info } from "./components/info/Info";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8">
        <div className="flex flex-row justify-end">
          <Info />
        </div>
        <Label className="text-4xl">Email</Label>
        <Input
          placeholder="email@example.com"
          type="email"
          className="border-purple-900"
          value={email}
          onBlur={handleBlur}
          onChange={(e) => setEmail(e.target.value)}
        />
        {touched && !isValidEmail(email) && email !== "" && (
          <p className="text-red-600">Not Valid Email!</p>
        )}
        <Label className="text-4xl">Password</Label>
        <div className="flex flex-row">
          <Input
            placeholder="*****"
            type={showPassword ? "text" : "password"}
            className="border-purple-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
                    <AiOutlineLoading className="animate-spin text-orange-400 text-lg w-full" />
                  ) : (
                    <Button
                      className={`bg-orange-400 text-slate-50 w-full`}
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
            <Link href="/pages/register" className="text-orange-400">
              Register?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
