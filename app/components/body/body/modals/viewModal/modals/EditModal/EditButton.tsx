"use client";
import React from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
export function EditButton(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, postData] = useState<any>({
    weight: data.data.x.weight,
    tookFatburner: data.data.x.tookFatburner,
    totalCalories: data.data.x.totalCalories,
    tookWeightmanagement: data.data.x.tookWeightmanagement,
    tookVitamin: data.data.x.tookVitamin,
    totalProtein: data.data.x.totalProtein,
    totalFat: data.data.x.totalFat,
    totalCarbs: data.data.x.totalCarbs,
    totalSugar: data.data.x.totalSugar,
  });
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseFloat(value) : value;
    postData((prevPost: any) => ({
      ...prevPost,
      [name]: newValue,
    }));
  };
  const handleSwitchChange = (name: any, checked: any) => {
    postData({
      ...post,
      [name]: checked,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .patch(`/api/nutrients/edit/${data.data.x.id}`, post)
        .then(() => {
          window.location.reload();
          toast({
            description: "Data has been saved.",
            className: "bg-lime-800",
          });
        });
      setOpen(false);
    } catch (error) {
    } finally {
      postData({});
      setLoading(false);
      setOpen(false);
      toast({
        description: "Data has been saved.",
        className: "bg-lime-800",
      });
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div className="flex flex-row justify-between items-center mx-2">
            <Button variant={"ghost"} className="text-accent">
              <MdEditNote size={30} onClick={() => setOpen(true)} />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      {loading ? (
                        <AiOutlineLoading className="animate-spin text-secondary text-lg" />
                      ) : (
                        <Button
                          disabled={!post.weight || !post.totalCalories}
                          type="submit"
                          className="text-secondary"
                          variant={"ghost"}
                        >
                          <FaSave size={20} />
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Save Data</TooltipContent>
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
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                      value={post.weight}
                      onChange={handleChange}
                      placeholder=""
                    />
                    <Label
                      htmlFor="floating-input"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
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
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                      value={post.totalCalories}
                      onChange={handleChange}
                      placeholder=""
                    />
                    <Label
                      htmlFor="floating-input"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
                    >
                      Calories
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center m-2">
                <div className="flex flex-col justify-center items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
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
                        <Label className="text-center cursor-help mb-2 text-xl">
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
            <div className="flex flex-row justify-center items-center mb-5">
              <div className="mx-2">
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    type="number"
                    name="totalProtein"
                    id="floating-input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                    value={post.totalProtein}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
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
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                    value={post.totalFat}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
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
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                    value={post.totalCarbs}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
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
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary"
                    value={post.totalSugar}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <Label
                    htmlFor="floating-input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-4000 dark:text-gray-400 peer-focus:dark:text-secondary"
                  >
                    Sugar
                  </Label>
                </div>
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-end">
            <Badge>{data.data.x.createdAt}</Badge>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
