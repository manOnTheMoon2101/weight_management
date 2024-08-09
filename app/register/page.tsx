"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [user, postUser] = useState<any>({});
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/addUser", user)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        postUser({});
        setLoading(false);
        console.log(user);
        router.push("/login");
      });
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = String(e.target.value);
    postUser((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md">
        <h2 className="text-6xl">Register Account</h2>
        <form>
          <Label className="text-2xl">Name</Label>
          <Input
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
          <Label className="text-2xl">Email</Label>
          <Input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
          <Label className="text-2xl">Password</Label>
          <Input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
          <div className="flex flex-row justify-end">
            <Link href="/login" className="underline text-xs">
              Already have a Account?
            </Link>
          </div>
          {loading ? (
            <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
          ) : (
            <Button
              className="bg-orange-400 text-slate-50"
              onClick={handleSubmit}
              disabled={!user.email || !user.password || !user.name}
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
