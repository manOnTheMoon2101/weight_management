"use client";

import Dashboard_table from "@/app/components/table/Dashboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
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
      <div>
        <Dashboard_table month={selectedMonth} />
      </div>
    </div>
  );
}
