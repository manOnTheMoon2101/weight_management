"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { FaInfoCircle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Login = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8">
        <div className="flex flex-row justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="cursor-help" variant="ghost">
                  <FaInfoCircle size={30} className="text-orange-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="">
                <div>
                  <h2 className="text-center text-2xl">
                    Welcome to my Weight Management App!
                  </h2>
                  <p className="m-5 text-center ">
                    This platform is designed specifically for showcasing
                    individual work and is used by a select group of users.
                    <br />
                    To ensure the security of your information, please avoid
                    using real-life Google passwords or any other sensitive
                    credentials when registering or logging in.
                    <br />
                  </p>
                  <p className="m-5 text-center">
                    If you encounter any bugs or issues while using the site,I
                    encourage you to report them so we can address them
                    promptly.
                    <br />
                    Your feedback is invaluable in helping me improve the
                    experience for everyone.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Label className="text-4xl text-center">Email</Label>
        <Input
          placeholder="email@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="text-4xl">Password</Label>
        <Input
          placeholder="*****"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col mt-10">
          {loading ? (
            <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
          ) : (
            <Button
              className="bg-orange-400 text-slate-50 w-full"
              onClick={onSubmit}
              disabled={!email || !password}
            >
              Login
            </Button>
          )}

          <p className="mt-10">
            Don't have an account?{" "}
            <Link href="/register" className="text-orange-600">
              Register?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
