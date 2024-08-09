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
const EditButton = (data: any) => {
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

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex flex-row justify-between items-center">
            <p>Edit</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <form>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-center items-center m-2">
                <Label className="text-center mb-2 text-xl">Weight</Label>
                <Input
                  type="number"
                  name="weight"
                  value={data.data.x.weight}
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
                  value={data.data.x.totalCalories}
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
                  checked={data.data.x.tookFatburner}
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
                  checked={data.data.x.tookWeightmanagement}
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
                <Switch name="tookVitamin" checked={data.data.x.tookVitamin} />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-5">
              <div className="text-center">
                <Label className="text-center mb-2 text-xl">Protein</Label>
                <Input
                  type="number"
                  name="totalProtein"
                  value={data.data.x.totalProtein}
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
                  value={data.data.x.totalFat}
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
                  value={data.data.x.totalCarbs}
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
                  value={data.data.x.totalSugar}
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
                        "Save"
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-left">Save Data</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditButton;
