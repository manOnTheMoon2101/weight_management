"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Props {
  weight: number;
  tookFatburner: boolean;
  totalCalories: number;
  tookWeightmanagement: boolean;
  tookVitamin: boolean;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalSugar: number;
}
const AddForm = () => {
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
      .post("/api/data", post)
      .then((res: any) => {
        console.log(res);
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
        toast({
          description: "Data has been saved.",
          className: "bg-lime-800",
        });
      });
  };

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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex flex-row justify-between items-center">
            <IoMdAddCircleOutline size={35} />
            <p>Add New</p>
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
                  onChange={handleChange}
                  step="0.01"
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
                  onChange={handleChange}
                  step="1"
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
                  onChange={handleChange}
                  step="0.01"
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
                  onChange={handleChange}
                  step="0.01"
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
                  onChange={handleChange}
                  step="0.01"
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
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled={!post.weight || !post.totalCalories}
                      type="submit"
                      className="bg-orange-400 text-slate-50"
                    >
                      {loading ? (
                        <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-red-600 text-left">
                  {!post.weight && "Weight Required"}
                  <br />
                  {!post.totalCalories && "Calories Required"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
