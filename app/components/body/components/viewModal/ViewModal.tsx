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
import { Badge } from "@/components/ui/badge";
import { Cousine } from "next/font/google";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
const ViewModal = (data: any) => {
  return (
    <div>
      <div className="flex flex-row justify-start">
        <EditButton data={data} />
        <DeleteButton data={data.x.id} />
      </div>
      <form>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col justify-center items-center m-2">
            <div className="flex flex-col justify-center items-center m-2">
              <Label
                className={`text-center mb-2 text-xl ${cousine.className}`}
              >
                Weight
              </Label>
              <Badge className="bg-orange-400 text-white">
                {data.x.weight}
              </Badge>
            </div>

            <div className="flex flex-col justify-center items-center m-2">
              <Label
                className={`text-center mb-2 text-xl ${cousine.className}`}
              >
                Calories
              </Label>
              <Badge className="bg-orange-400 text-white">
                {data.x.totalCalories}
              </Badge>
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
              <p className="text-lg">{data.x.tookFatburner ? "💊" : "none"}</p>
            </div>

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
              <p className="text-lg">
                {data.x.tookWeightmanagement ? "💊" : "none"}
              </p>
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
              <p className="text-lg">{data.x.tookVitamin ? "💊" : "none"}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mb-5">
          <div className="flex flex-col justify-center items-center m-2">
            <Label className={`text-center mb-2 text-xl ${cousine.className}`}>
              Protein
            </Label>
            <Badge className="bg-orange-400 text-white">
              {data.x.totalProtein}
            </Badge>
          </div>

          <div className="flex flex-col justify-center items-center m-2">
            <Label className={`text-center mb-2 text-xl ${cousine.className}`}>
              Fat
            </Label>
            <Badge className="bg-orange-400 text-white">
              {data.x.totalFat}
            </Badge>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mb-5">
          <div className="flex flex-col justify-center items-center m-2">
            <Label className={`text-center mb-2 text-xl ${cousine.className}`}>
              Carbs
            </Label>
            <Badge className="bg-orange-400 text-white">
              {data.x.totalCarbs}
            </Badge>
          </div>

          <div className="flex flex-col justify-center items-center m-2">
            <Label className={`text-center mb-2 text-xl ${cousine.className}`}>
              Sugar
            </Label>
            <Badge className="bg-orange-400 text-white">
              {data.x.totalSugar}
            </Badge>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
