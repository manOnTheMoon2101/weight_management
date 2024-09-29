"use client";
import useSWR from "swr";
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
import { useState } from "react";
import { AddForm } from "./modals/addform/AddForm";
import ProteinGraph from "./graphs/ProteinGraph";
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

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const url = `/api/nutrients/get/${selectedMonth}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <p>loading</p>;
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="mx-2 md:">
          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              setSelectedMonth(value);
            }}
            defaultValue={getCurrentMonthTwoDigit()}
          >
            <SelectTrigger className="w-[180px] mx-3 border border-orange-400">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
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
          <AddForm />
        </div>
      </div>
      <div className="flex flex-col md:flex-col justify-around  h-full">
        <div className="w-full my-5 md:flex flex-row justify-around overflow-auto">
          <ProteinGraph data={data} month={selectedMonth} />
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
