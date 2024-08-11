"use client";

import Dashboard_table from "@/app/components/table/Table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeightGraph from "../graphs/WeightGraph";
import { useState } from "react";
import AddForm from "../components/addform/AddForm";
export function Dashboard() {
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
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Select
          value={selectedMonth}
          onValueChange={(value) => {
            setSelectedMonth(value);
          }}
          defaultValue={getCurrentMonthTwoDigit()}
        >
          <SelectTrigger className="w-[180px]">
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
        <AddForm />
      </div>
      <div className="flex flex-col md:flex-row justify-around m-5 h-full">
        <div className="w-full md:w-[30%] max-h-[50vh] overflow-auto mx-2 ">
          <WeightGraph month={selectedMonth} />
        </div>
        <div className="w-full md:w-auto flex-1">
          <Dashboard_table month={selectedMonth} />
        </div>
      </div>
    </div>
  );
}
