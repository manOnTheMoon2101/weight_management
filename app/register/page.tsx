"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'
const Register = () => {
  const [user, postUser] = useState<any>({});
  const router = useRouter()
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        console.log(user);
        router.push('/login')
        
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
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
          <Input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
          <Input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
          <p>
            <Link href="/login">Login</Link>
          </p>
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
