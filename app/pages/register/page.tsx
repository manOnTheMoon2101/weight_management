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
import isValidEmail from "@/utils/emailValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Info } from "../login/components/info/Info";
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
      .post("/api/user/create", user)
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
        router.push("/pages/login");

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
    <div>
      <div className="flex flex-row justify-end">
        <Info />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded shadow-lg">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold my-8">Register</h2>
          </div>
          <form>
            {/* <Label className="text-4xl">Name</Label>
            <Input
              placeholder="First Name"
              name="name"
              className="border-purple-900"
              onChange={handleChange}
              value={user.name}
            /> */}
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="text"
                name="name"
                id="floating-input"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                onChange={handleChange}
                value={user.name}
                onBlur={handleBlur}
                placeholder=""
              />
              <Label
                htmlFor="floating-input"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
              >
                Name
              </Label>
            </div>
            {/* <Label className="text-4xl">Email</Label>
            <Input
              placeholder="email@example.com"
              className="border-purple-900"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={user.email}
            /> */}
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="email"
                name="name"
                id="floating-input"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                onChange={handleChange}
                value={user.email}
                onBlur={handleBlur}
                placeholder=""
              />
              <Label
                htmlFor="floating-input"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
              >
                Email
              </Label>
            </div>
            {touched && !isValidEmail(user.email) && user.email !== "" && (
              <p className="text-red-600">Not Valid Email!</p>
            )}
            {/* <Label className="text-4xl">Password</Label> */}
            <div className="flex flex-row">
              {/* <Input
                placeholder="*****"
                name="password"
                type={showPassword ? "text" : "password"}
                className="border-purple-900"
                onChange={handleChange}
                value={user.password}
              /> */}

              <div className="group relative z-0 mb-6 w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="floating-input"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                  onChange={handleChange}
                  value={user.password}
                  onBlur={handleBlur}
                  placeholder=""
                />
                <Label
                  htmlFor="floating-input"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
                >
                  Name
                </Label>
              </div>

              <Button type="button" onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <div className="flex flex-col mt-10">
              {loading ? (
                <AiOutlineLoading className="animate-spin text-secondary text-lg w-full" />
              ) : (
                <Button
                  className="bg-secondary text-slate-50 w-full"
                  onClick={handleSubmit}
                  disabled={
                    !isValidEmail(user.email) || !user.password || !user.name
                  }
                >
                  Register
                </Button>
              )}
              <p className="mt-10">
                Already have a account?
                <Link href="/pages/login" className="text-secondary">
                  {" "}
                  Log In?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
