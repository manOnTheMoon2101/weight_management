import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
      <Input placeholder="Name" />
      <Input placeholder="Surname" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <p>
          <Link href="/login">Login</Link>
        </p>
        <Button>Register</Button>
      </div>
    </div>
  );
};

export default Register;
