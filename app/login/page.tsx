"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef } from "react";
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md">
        <Input
          placeholder="Email"
          type="email"
          onChange={(e: any) => {
            email.current = e.target.value;
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            password.current = e.target.value;
          }}
        />
        <p>
          <Link href="/register">Register</Link>
        </p>
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
