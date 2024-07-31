"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
const Login = () => {
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <h2>
          Welcome to <span>Weight Management</span>
        </h2>
      </div>
      <div className="p-8 rounded shadow-md border-4 rounded">
        <Label>Email</Label>
        <Input
          placeholder="email@email.com"
          type="email"
          onChange={(e: any) => {
            email.current = e.target.value;
          }}
        />
        <Label>Password</Label>
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

        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
