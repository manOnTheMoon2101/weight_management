import React from "react";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import { EditButton } from "./components/EditButton/EditButton";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const ViewModal = (data: any) => {
  return (
    <div>
      <form>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center items-center m-2">
            <Label className="text-center mb-2 text-xl">Weight</Label>
            <p>{data.x.weight}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-2">
            <Label className="text-center mb-2 text-xl">Total Calories</Label>
            <p>{data.x.totalCalories}</p>
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
            <p className="text-lg">{data.x.tookFatburner ? "💊" : "none"}</p>
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
            <p className="text-lg">
              {data.x.tookWeightmanagement ? "💊" : "none"}
            </p>
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
            <p className="text-lg">{data.x.tookVitamin ? "💊" : "none"}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-center">
            <Label className="text-center mb-2 text-xl">Protein</Label>
            <p>{data.x.totalProtein}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-center">
            <Label className="text-xl mb-2">Fat</Label>
            <p>{data.x.totalFat}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-center">
            <Label className="text-xl">Carbs</Label>
            <p>{data.x.totalCarbs}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-center">
            <Label className="text-xl">Sugar</Label>
            <p>{data.x.totalSugar}</p>
          </div>
        </div>
      </form>

      <EditButton data={data} />
      <DeleteButton data={data.x.id} />
    </div>
  );
};

export default ViewModal;
