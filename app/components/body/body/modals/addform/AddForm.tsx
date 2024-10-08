"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cousine } from "next/font/google";
import { Badge } from "@/components/ui/badge";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
export function AddForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, postData] = useState<any>({
    weight: 0,
    tookFatburner: false,
    totalCalories: 0,
    tookWeightmanagement: false,
    tookVitamin: false,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
    totalSugar: 0,
  });
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/nutrients/post", post)
      .then((res: any) => {
        toast({
          description: "Data has been saved.",
          className: "bg-lime-800",
        });
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
        toast({
          description: "Error",
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
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Record +</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      {loading ? (
                        <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                      ) : (
                        <Button
                          disabled={!post.weight || !post.totalCalories}
                          type="submit"
                          variant={"ghost"}
                        >
                          <FaSave size={20} className="text-orange-400" />
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-red-600 text-left">
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
                  <Label
                    className={`text-center mb-2 text-xl ${cousine.className}`}
                  >
                    Weight
                  </Label>
                  <Input
                    type="number"
                    name="weight"
                    className="border-orange-400"
                    value={post.weight}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
                <div className="my-2">
                  <Label
                    className={`text-center mb-2 text-xl ${cousine.className}`}
                  >
                    Calories
                  </Label>
                  <Input
                    type="number"
                    name="totalCalories"
                    className="border-orange-400"
                    value={post.totalCalories}
                    onChange={handleChange}
                    step="1"
                  />
                </div>
              </div>

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
                      name="tookVitamin"
                      checked={post.tookVitamin}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("tookVitamin", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mb-5">
              <div className="text-center mx-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Protein
                </Label>
                <Input
                  type="number"
                  name="totalProtein"
                  value={post.totalProtein}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <div className="text-center mx-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Fat
                </Label>
                <Input
                  type="number"
                  name="totalFat"
                  value={post.totalFat}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center mb-5">
              <div className="text-center mx-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Carbs
                </Label>
                <Input
                  type="number"
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
                  Sugar
                </Label>
                <Input
                  type="number"
                  name="totalSugar"
                  value={post.totalSugar}
                  onChange={handleChange}
                  step="0.01"
                />
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
          <div className="flex flex-row justify-end">
            <Badge>{formattedDate}</Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>New Record +</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-start">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    {loading ? (
                      <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                    ) : (
                      <Button
                        disabled={!post.weight || !post.totalCalories}
                        type="submit"
                        variant={"ghost"}
                      >
                        <FaSave size={20} className="text-orange-400" />
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-red-600 text-left">
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
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Weight
                </Label>
                <Input
                  type="number"
                  name="weight"
                  className="border-orange-400"
                  value={post.weight}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <div className="my-2">
                <Label
                  className={`text-center mb-2 text-xl ${cousine.className}`}
                >
                  Calories
                </Label>
                <Input
                  type="number"
                  name="totalCalories"
                  className="border-orange-400"
                  value={post.totalCalories}
                  onChange={handleChange}
                  step="1"
                />
              </div>
            </div>

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
                    name="tookVitamin"
                    checked={post.tookVitamin}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("tookVitamin", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center mb-5">
            <div className="text-center mx-2">
              <Label
                className={`text-center mb-2 text-xl ${cousine.className}`}
              >
                Protein
              </Label>
              <Input
                type="number"
                name="totalProtein"
                value={post.totalProtein}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <div className="text-center mx-2">
              <Label
                className={`text-center mb-2 text-xl ${cousine.className}`}
              >
                Fat
              </Label>
              <Input
                type="number"
                name="totalFat"
                value={post.totalFat}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </div>

          <div className="flex flex-row justify-center items-center mb-5">
            <div className="text-center mx-2">
              <Label
                className={`text-center mb-2 text-xl ${cousine.className}`}
              >
                Carbs
              </Label>
              <Input
                type="number"
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
                Sugar
              </Label>
              <Input
                type="number"
                name="totalSugar"
                value={post.totalSugar}
                onChange={handleChange}
                step="0.01"
              />
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
        <div className="flex flex-row justify-end">
          <Badge>{formattedDate}</Badge>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
