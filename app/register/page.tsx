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
import { toast } from "@/components/ui/use-toast";
import isValidEmail from "../utils/emailValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [user, postUser] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
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
        if (err) {
          toast({
            description: "Error",
            className: "bg-red-800",
          });
        }
      })
      .finally(() => {
        postUser({});
        setLoading(false);
        console.log(user);
        router.push("/login");

        toast({
          description: "User Successfully Created ",
          className: "bg-lime-800",
        });
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = () => {
    setTouched(true);
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = String(e.target.value);
    postUser((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md">
        <form>
          <Label className="text-4xl text-center">Name</Label>
          <Input
            placeholder="First Name"
            name="name"
            className="border-purple-900"
            onChange={handleChange}
            value={user.name}
          />
          <Label className="text-4xl text-center">Email</Label>
          <Input
            placeholder="email@example.com"
            className="border-purple-900"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={user.email}
          />
          {touched && !isValidEmail(user.email) && user.email !== "" && (
            <p className="text-red-600">Not Valid Email!</p>
          )}
          <Label className="text-4xl text-center">Password</Label>
          <div className="flex flex-row">
            <Input
              placeholder="*****"
              name="password"
              type={showPassword ? "text" : "password"}
              className="border-purple-900"
              onChange={handleChange}
              value={user.password}
            />
            <Button type="button" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <div className="flex flex-col mt-10">
            {loading ? (
              <AiOutlineLoading className="animate-spin text-orange-400 text-lg w-full" />
            ) : (
              <Button
                className="bg-orange-400 text-slate-50 w-full"
                onClick={handleSubmit}
                disabled={
                  !isValidEmail(user.email) || !user.password || !user.name
                }
              >
                Register
              </Button>
            )}
            <p className="mt-10">
              Already have a Account?
              <Link href="/login" className="text-orange-400">
                {" "}
                Log In?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
