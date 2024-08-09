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
      <div className="p-8 rounded shadow-md border-4 rounded">
        <div>
          <h2 className="text-6xl">Welcome</h2>
        </div>
        <Label className="text-2xl text-center">Email</Label>
        <Input
          placeholder="email@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="text-2xl">Password</Label>
        <Input
          placeholder="*****"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-row justify-end">
          <Link href="/register" className="underline text-xs">
            No Account? Create one now
          </Link>
        </div>

        {loading ? (
          <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
        ) : (
          <Button className="bg-orange-400 text-slate-50" onClick={onSubmit} disabled={!email || !password}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
