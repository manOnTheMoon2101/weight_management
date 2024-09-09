"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const isDisabled = !email || !password;
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8">
        <div className="flex flex-row justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-help" variant="ghost">
                <FaInfoCircle size={30} className="text-orange-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 max-w-full max-h-full overflow-auto">
              <div>
                <h2 className="text-center text-2xl">
                  Welcome to my Weight Management App!
                </h2>
                <p className="m-5 text-center ">
                  This platform is designed specifically for showcasing
                  individual work and is used by a select group of users.
                  <br />
                  <br />
                  To ensure the security of your information, please avoid using
                  real-life Google passwords or any other sensitive credentials
                  when registering or logging in.
                  <br />
                  <br />
                </p>
                <p className="m-5 text-center">
                  If you encounter any bugs or issues while using the site,I
                  encourage you to report them so we can address them promptly.
                  <br />
                  Your feedback is invaluable in helping me improve the
                  experience for everyone.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Label className="text-4xl text-center">Email</Label>
        <Input
          placeholder="email@email.com"
          type="email"
          className="border-purple-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="text-4xl">Password</Label>
        <Input
          placeholder="*****"
          type="password"
          className="border-purple-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
                      disabled={!email || !password}
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
            <Link href="/register" className="text-orange-400">
              Register?
            </Link>
          </p>
          <p className="mt-10">
            Don't want to create a account{" "}
            <Link href="/demo" className="text-orange-400">
             Demo?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
