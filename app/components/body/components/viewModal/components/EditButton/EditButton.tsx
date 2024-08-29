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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    const { name, value, type, checked } = e.target;
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
      await axios.patch(`/api/edit/${data.data.x.id}`, post).then(() => {
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
  if (isDesktop) {
    return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="flex flex-row justify-between items-center">
              <Button onClick={() => setOpen(true)} className="m-5">
                Edit
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center items-center m-2">
                  <Label className="text-center mb-2 text-xl">Weight</Label>
                  <Input
                    type="number"
                    name="weight"
                    value={post.weight}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col justify-center items-center m-2">
                  <Label className="text-center mb-2 text-xl">
                    Total Calories
                  </Label>
                  <Input
                    type="number"
                    name="totalCalories"
                    value={post.totalCalories}
                    step="1"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-evenly m-10">
                <div className="flex flex-col justify-center items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
                          FB
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
                    name="tookVitamin"
                    checked={post.tookVitamin}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("tookVitamin", checked)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mb-5">
                <div className="text-center">
                  <Label className="text-center mb-2 text-xl">Protein</Label>
                  <Input
                    type="number"
                    name="totalProtein"
                    value={post.totalProtein}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-5">
                <div className="text-center">
                  <Label className="text-xl mb-2">Fat</Label>
                  <Input
                    type="number"
                    name="totalFat"
                    value={post.totalFat}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-5">
                <div className="text-center">
                  <Label className="text-xl">Carbs</Label>
                  <Input
                    type="number"
                    name="totalCarbs"
                    value={post.totalCarbs}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-5">
                <div className="text-center">
                  <Label className="text-xl">Sugar</Label>
                  <Input
                    type="number"
                    name="totalSugar"
                    value={post.totalSugar}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                          className="bg-orange-400 text-slate-50"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Save Data</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div className="flex flex-row justify-between items-center">
            <Button onClick={() => setOpen(true)} className="m-5">
              Edit
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-center items-center m-2">
                <Label className="text-center mb-2 text-xl">Weight</Label>
                <Input
                  type="number"
                  name="weight"
                  value={post.weight}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col justify-center items-center m-2">
                <Label className="text-center mb-2 text-xl">
                  Total Calories
                </Label>
                <Input
                  type="number"
                  name="totalCalories"
                  value={post.totalCalories}
                  step="1"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-evenly m-10">
              <div className="flex flex-col justify-center items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="text-center cursor-help mb-2 text-xl">
                        FB
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
                  name="tookVitamin"
                  checked={post.tookVitamin}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("tookVitamin", checked)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-5">
              <div className="text-center">
                <Label className="text-center mb-2 text-xl">Protein</Label>
                <Input
                  type="number"
                  name="totalProtein"
                  value={post.totalProtein}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <div className="text-center">
                <Label className="text-xl mb-2">Fat</Label>
                <Input
                  type="number"
                  name="totalFat"
                  value={post.totalFat}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <div className="text-center">
                <Label className="text-xl">Carbs</Label>
                <Input
                  type="number"
                  name="totalCarbs"
                  value={post.totalCarbs}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <div className="text-center">
                <Label className="text-xl">Sugar</Label>
                <Input
                  type="number"
                  name="totalSugar"
                  value={post.totalSugar}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>
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
                        className="bg-orange-400 text-slate-50"
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>Save Data</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
