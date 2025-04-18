import { useState, useEffect } from "react";
import { Dashboard_table } from "./table/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeightGraph from "./graphs/WeightGraph";
import { CalorieGraph } from "./graphs/CalorieGraph";
import { AddForm } from "./modals/addform/AddForm";
import ProteinGraph from "./graphs/ProteinGraph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { FiCalendar } from "react-icons/fi";
import React from "react";
export function Body() {
  const getCurrentMonthTwoDigit = () => {
    let date = new Date();

    let month = date.getMonth() + 1;

    if (month < 10) {
      return "0" + month;
    } else {
      return "" + month;
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(
    `${getCurrentMonthTwoDigit()}`
  );
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (month: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/nutrients/get/${month}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  if (error) return <div>failed to load: {error}</div>;

  if (isLoading)
    return (
      <div>
        <div className="flex flex-row justify-between">
          <div className="mx-2 md:">
            <Skeleton className="w-[180px] h-[50px] mx-3 border" />
          </div>
          <div className="mx-2 md:">
            <Skeleton className="w-[180px] h-[50px] mx-3 border" />
          </div>
        </div>
        <div className="flex flex-col md:flex-col justify-around h-full">
          <div className="w-full my-5 md:flex flex-row justify-around overflow-auto">
            {/* <Skeleton className="w-full h-[400px] sm:w-[360px] bg-red-400" /> */}
            <Skeleton className="w-full h-[400px] sm:w-[1/2] bg-accent mx-2" />
            <Skeleton className="w-full h-[400px] sm:w-[1/2]  bg-accent mx-2" />
          </div>
          <div className="w-full my-5 flex-1">
            <Skeleton className="w-full h-96 mx-3 " />
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="mx-2 md:">
          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              setSelectedMonth(value);
            }}
            defaultValue={getCurrentMonthTwoDigit()}
          >
            <SelectTrigger className="w-[180px] mx-2 border border-accent">
              <FiCalendar size={21} />
              <SelectValue placeholder="Select Month..." />
            </SelectTrigger>
            <SelectContent className="bg-accent">
              <SelectItem value="01">January</SelectItem>
              <SelectItem value="02">February</SelectItem>
              <SelectItem value="03">March</SelectItem>
              <SelectItem value="04">April</SelectItem>
              <SelectItem value="05">May</SelectItem>
              <SelectItem value="06">June</SelectItem>
              <SelectItem value="07">July</SelectItem>
              <SelectItem value="08">August</SelectItem>
              <SelectItem value="09">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mx-2 md:">
            <AddForm data={data} />
        </div>
      </div>
      <div className="flex flex-col md:flex-col justify-around  h-full">
        <div className="w-full my-5 md:flex flex-row justify-around overflow-auto">
          {/* <ProteinGraph data={data} month={selectedMonth} /> */}
          <WeightGraph data={data} month={selectedMonth} />
          <CalorieGraph data={data} month={selectedMonth} />
        </div>
        <div className="w-full my-5 flex-1">
          <Dashboard_table data={data} month={selectedMonth} />
        </div>
      </div>
    </div>
  );
}
