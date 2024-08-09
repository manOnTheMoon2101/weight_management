"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
const Login = () => {
  const { toast } = useToast();
  const email = useRef("");
  const [loading, setLoading] = useState(false);
  const password = useRef("");

  const onSubmit = async () => {
    setLoading(false);
    await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 rounded shadow-md border-4 rounded">
        <div>
          <h2 className="text-6xl">Welcome</h2>
        </div>
        <Label className="text-2xl text-center">Email</Label>
        <Input
          placeholder="email@email.com"
          type="email"
          onChange={(e: any) => {
            email.current = e.target.value;
          }}
        />
        <Label className="text-2xl">Password</Label>
        <Input
          placeholder="*****"
          type="password"
          onChange={(e: any) => {
            password.current = e.target.value;
          }}
        />

        <div className="flex flex-row justify-end">
          <Link href="/register" className="underline text-xs">
            No Account?Create one now
          </Link>
        </div>

        {loading ? (
          <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
        ) : (
          <Button onClick={onSubmit}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Login;
