import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">\
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <p>
          <Link href="/register">Register</Link>
        </p>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Login;
