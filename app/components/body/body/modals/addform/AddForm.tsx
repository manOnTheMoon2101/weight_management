"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cousine } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import RandomTip from "./Qoutes/Qoutes";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
export function AddForm(props: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, postData] = useState<any>({
    weight: null,
    tookFatburner: false,
    totalCalories: 1,
    tookWeightmanagement: false,
    tookVitamin: false,
    totalProtein: null,
    totalFat: null,
    totalCarbs: null,
    totalSugar: null,
  });
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/nutrients/post", post)
      .then((res: any) => {
        toast({
          description: "Succesfully saves data.",
          className: "bg-lime-800",
        });
      })
      .catch((err: any) => {
        console.log(err);
        toast({
          description: `${err}`,
          className: "bg-red-800",
        });
      })
      .finally(() => {
        postData({});
        setLoading(false);
        setOpen(false);
      });
  };
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString(
    "en-US",
    options
  );
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    postData({
      ...post,
      [name]: type === "checkbox" ? checked : parseFloat(value),
    });
  };
  const handleSwitchChange = (name: any, checked: any) => {
    postData({
      ...post,
      [name]: checked,
    });
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"} className="bg-accent">
          Add Data <Plus className="mx-2" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between items-center">
            <Badge className="h-6">{formattedDate}</Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    {loading ? (
                      <AiOutlineLoading className="animate-spin text-accent text-lg" />
                    ) : (
                      <Button
                        disabled={!post.weight || !post.totalCalories}
                        type="submit"
                        variant={"ghost"}
                        className={`${
                          !post.weight || !post.totalCalories
                            ? "text-gray-500"
                            : "text-accent"
                        }`}
                      >
                        <FaSave size={20} />
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-accent">
                  {!post.weight && "Weight Required"}
                  <br />
                  {!post.totalCalories && "Calories Required"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col justify-center items-center m-2">
              <div className="my-2">
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    type="number"
                    name="weight"
                    id="floating-input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                    value={post.weight}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                  >
                    Weight(kg)
                  </Label>
                </div>
              </div>
              <div className="my-2">
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    type="number"
                    name="totalCalories"
                    id="floating-input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                    value={post.totalCalories}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                  >
                    Calories
                  </Label>
                </div>
              </div>
            </div>
            {/* 
            <div  className="flex flex-col justify-center items-center">
            <RandomTip/>
          </div> */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Supplements</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-center items-center m-2">
                    <div className="flex flex-col justify-center items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label
                              className={`text-center mb-2 text-xl ${cousine.className}`}
                            >
                              L-C
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Fat Burner</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Switch
                        className="data-[state=checked]:bg-green-400"
                        name="tookFatburner"
                        checked={post.tookFatburner}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("tookFatburner", checked)
                        }
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-col justify-center items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Label
                                className={`text-center mb-2 text-xl ${cousine.className}`}
                              >
                                CLA
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>(Conjugated linoleic acid)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Switch
                          className="data-[state=checked]:bg-pink-400"
                          name="tookWeightmanagement"
                          checked={post.tookWeightmanagement}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("tookWeightmanagement", checked)
                          }
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Label
                                className={`text-center mb-2 text-xl ${cousine.className}`}
                              >
                                VIT
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Vitamin</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Switch
                          className="data-[state=checked]:bg-cyan-400"
                          name="tookVitamin"
                          checked={post.tookVitamin}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("tookVitamin", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-row justify-center items-center mb-5">
            <div className="mx-2">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="totalProtein"
                  id="floating-input"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                  value={post.totalProtein}
                  onChange={handleChange}
                  placeholder=""
                />
                <Label
                  htmlFor="floating-input"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                >
                  Protein
                </Label>
              </div>
            </div>
            <div className="mx-2">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="totalFat"
                  id="floating-input"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                  value={post.totalFat}
                  onChange={handleChange}
                  placeholder=""
                />
                <Label
                  htmlFor="floating-input"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                >
                  Fat
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center mb-5">
            <div className="mx-2">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="totalCarbs"
                  id="floating-input"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                  value={post.totalCarbs}
                  onChange={handleChange}
                  placeholder=""
                />
                <Label
                  htmlFor="floating-input"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                >
                  Carbs
                </Label>
              </div>
            </div>
            <div className="mx-2">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="totalSugar"
                  id="floating-input"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-accent"
                  value={post.totalSugar}
                  onChange={handleChange}
                  placeholder=""
                />
                <Label
                  htmlFor="floating-input"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-accent"
                >
                  Sugar
                </Label>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-row justify-center items-center mb-5">
              <div className="text-center mx-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Caffiene
                </Label>
                <Input
                  type="number"
                  disabled
                  name="totalCarbs"
                  value={post.totalCarbs}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <div className="text-center mx-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Water
                </Label>
                <Input
                  type="number"
                  disabled
                  name="totalSugar"
                  value={post.totalSugar}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div> */}
        </form>
      </DrawerContent>
    </Drawer>
  );
}
